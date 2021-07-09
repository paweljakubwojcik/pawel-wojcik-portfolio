import React, { useEffect, useReducer, useRef, useState } from 'react'

import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'

import Section from './Section'

import { ProjectType } from '../typescript'
import ProjectLink from './ProjectLink'

type ProjectSectionQuery = {
  allGraphCmsProject: {
    nodes: ProjectType[]
  }
}

function reducer({ active, positionMap }, { type, payload }) {
  let newIndex
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

export default function ProjectsSection() {
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
  const [{ active, positionMap }, dispatch] = useReducer(reducer, {
    active: 0,
    positionMap: new Array(projects.length).fill(0).map((v, i) => i),
  })

  const startAnimation = () => {
    clearInterval()
    animationInterval.current = setInterval(() => {
      dispatch({ type: 'increment', payload: null })
    }, 5000)
  }

  const stopAnimation = () => {
    clearInterval(animationInterval.current)
  }

  useEffect(() => {
    startAnimation()
    return () => stopAnimation()
  }, [])

  console.log(animationInterval.current)

  return (
    <>
      <Section.Column style={{ zIndex: 1, pointerEvents: 'none' }}>
        <Section.Title>My projects</Section.Title>
        <Section.Paragraph>See what I've been building for the past year</Section.Paragraph>
      </Section.Column>
      <Section.Column>
        <ImagesList
          onFocusCapture={stopAnimation}
          onBlur={startAnimation}
          onMouseEnter={stopAnimation}
          onMouseLeave={startAnimation}
        >
          {projects.map((project, i) => (
            <ProjectLink
              project={project}
              active={i === active}
              key={i}
              index={positionMap[i] - 1}
              onClick={
                i === active
                  ? () => dispatch({ type: 'increment', payload: null })
                  : () => dispatch({ type: 'set', payload: i })
              }
            />
          ))}
          <div style={{ display: 'block' }}></div>
        </ImagesList>
      </Section.Column>
    </>
  )
}

const ImagesList = styled.div`
  display: flex;
  position: relative;
  z-index: 0;

  min-width: 350px;
  @media (max-width: ${(props) => props.theme.breakpoints.MAX_TABLET}px) {
    margin: 3em 0;
    max-width: 100%;
    min-width: 200px;
  }
`
