import React, { useEffect, useReducer, useRef } from 'react'

import styled from 'styled-components'
import { graphql, Link, navigate, useStaticQuery } from 'gatsby'
import { useLocation } from '@reach/router'

import Section from '../Section'

import { ProjectType, PropsFromSnapscrollSection } from '../../typescript'
import ProjectLink from '../ProjectLink'
import { motion } from 'framer-motion'
import Button from '../Button'
import ProjectTile from '../ProjectTile'

import { navigateDirections } from '../../typescript'

type ProjectSectionQuery = {
  allGraphCmsProject: {
    nodes: ProjectType[]
  }
}

function changeTileReducer({ active, positionMap }: { active: number; positionMap: number[] }, { type, payload }) {
  let newIndex: number
  switch (type) {
    case 'set':
      newIndex = payload
      break
    case 'increment':
      newIndex = (active + 1) % positionMap.length
      break
    default:
      throw new Error()
  }
  const oldActiveIndex = positionMap.find((v) => v === active)
  const oldActive = positionMap[oldActiveIndex]
  const newActiveIndex = positionMap.find((v) => v === newIndex)
  const newActive = positionMap[newActiveIndex]

  positionMap[oldActiveIndex] = newActive
  positionMap[newActiveIndex] = oldActive

  return { active: newIndex, positionMap }
}

export default function ProjectsSection({ visible, wholeView, motionValue, ...rest }: PropsFromSnapscrollSection) {
  const {
    allGraphCmsProject: { nodes: projects },
  } = useStaticQuery<ProjectSectionQuery>(graphql`
    query ProjectsQuery {
      allGraphCmsProject {
        nodes {
          name
          brief
          link
          repository
          images {
            url
            gatsbyImageData(width: 600, placeholder: BLURRED, aspectRatio: 1.77)
          }
          skills {
            name
            icon {
              url
            }
          }
        }
      }
    }
  `)

  const animationInterval = useRef<NodeJS.Timeout>()
  // a map of positions example: [2, 0,1,3] => first pic has position nr.2, secodnd pic has position nr.0 etc...
  const [{ active, positionMap }, dispatch] = useReducer(changeTileReducer, {
    active: 0,
    positionMap: new Array(projects.length).fill(0).map((v, i) => i),
  })

  const startAnimation = () => {
    clearInterval(animationInterval.current)
    animationInterval.current = setInterval(() => {
      dispatch({ type: 'increment', payload: null })
    }, 6000)
  }

  const stopAnimation = () => {
    clearInterval(animationInterval.current)
  }

  useEffect(() => {
    if (visible) startAnimation()
    else stopAnimation()
  }, [visible])

  const imageContainerRef = useRef<HTMLDivElement>()
  const imageRefList = useRef<{ [key: string]: HTMLElement }>({})

  const handleGoToProjects = (e) => {
    e.preventDefault()
    stopAnimation()

    navigate(`projects`, {
      state: {
        positions: Object.fromEntries(
          Object.entries(imageRefList.current).map(([key, element]) => [key, element.getBoundingClientRect()])
        ),
        active,
        containerWidth: imageContainerRef.current.getBoundingClientRect().width,
      },
    })
  }

  const location = useLocation()

  const navigateTo =
    location.pathname.search('/projects*/') === 0
      ? navigateDirections.SINGLE_PROJECT
      : location.pathname === '/projects'
      ? navigateDirections.PROJECTS
      : navigateDirections.UNKNOWN

  return (
    <Section visible={visible} progress={motionValue} {...rest}>
      <Section.Column>
        <Section.Title>My projects</Section.Title>
        <Section.Paragraph>See what I've been building for the past year</Section.Paragraph>
        <ButtonWrapper exit={{ opacity: 0 }}>
          <Button onClick={handleGoToProjects} as={Link} to="projects">
            View full list
          </Button>
        </ButtonWrapper>
      </Section.Column>
      <Section.Column>
        <ImagesList
          onFocusCapture={stopAnimation}
          onBlur={startAnimation}
          onMouseEnter={stopAnimation}
          onMouseLeave={startAnimation}
          ref={imageContainerRef as any}
        >
          {projects.map((project, i) => (
            <ProjectLink
              active={i === active}
              key={i}
              index={positionMap[i]}
              onClick={
                i !== active
                  ? () => {
                      dispatch({ type: 'set', payload: i })
                      startAnimation()
                    }
                  : null
              }
              inView={wholeView}
              navigateTo={navigateTo}
              motionValue={motionValue}
            >
              <ProjectTile
                project={project}
                active={i === active}
                ref={(element) => (imageRefList.current[project.name] = element)}
              />
            </ProjectLink>
          ))}
          <Indicator exit={{ opacity: 0 }}>
            {projects.map((v, i) => (
              <Dot
                active={i === active}
                key={i}
                onClick={() => {
                  startAnimation()
                  dispatch({ type: 'set', payload: i })
                }}
              />
            ))}
          </Indicator>
        </ImagesList>
      </Section.Column>
    </Section>
  )
}

const ImagesList = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  width: fit-content;

  z-index: 0;

  min-width: 350px;
  @media (max-width: ${(props) => props.theme.breakpoints.MAX_TABLET}px) {
    margin: 3em 0;
    max-width: 100%;
    min-width: 200px;
  }
`

const Indicator = styled(motion.div)`
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
  width: 100%;

  margin-top: 2em;
`

const Dot = styled.button<{ active: boolean }>`
  display: block;
  width: 10px;
  height: 10px;
  margin: 1em;
  padding: 0;

  border-radius: 50%;
  border-width: 2px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.font.main};

  background-color: ${(props) => (props.active ? props.theme.colors.font.main : 'transparent')};

  transition: background-color 0.3s;

  @media (max-width: ${(props) => props.theme.breakpoints.MAX_TABLET}px) {
    width: 20px;
    height: 20px;
  }
`

const ButtonWrapper = styled(motion.div)`
  @media (max-width: ${(props) => props.theme.breakpoints.MAX_TABLET}px) {
    margin: auto;
  }
`
