import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, Variants } from 'framer-motion'
import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import styled from 'styled-components'
import ProjectTile from '../components/ProjectTile'
import Section from '../components/Section'
import Seo from '../components/Seo'
import { useTheme } from '../context/theme'
import useScreenSize from '../hooks/useScreenSize'
import { ProjectType } from '../typescript'

// on transition get all positions of images and store them in map/object where keys are names of projects

type State = {
  positions: {
    [key: string]: DOMRect
  }
  active: number
  containerWidth: number
}

type projectsPageProps = {
  location: {
    state: State
  }
}

export default function projects({ location: { state } }: projectsPageProps) {
  const {
    allGraphCmsProject: { nodes: projects },
  } = useStaticQuery<{ allGraphCmsProject: { nodes: ProjectType[] } }>(graphql`
    query AllProjects {
      allGraphCmsProject {
        nodes {
          name
          description
          brief
          images {
            id
            url
            gatsbyImageData(placeholder: BLURRED, aspectRatio: 1.77)
          }
          link
          repository
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

  return (
    <>
      <Seo title={'Projects'} />
      <TilesContainer>
        {projects.map((project, i) => (
          <Tile project={project} state={state} active={i === state?.active} key={project.name} />
        ))}
      </TilesContainer>
    </>
  )
}

const TileVariants: Variants = {
  grid: {
    x: 0,
    y: 0,
    scale: 1,
    fontSize: '1em',
    transition: {
      delay: 0.1,
      type: 'spring',
      duration: 0.7,
    },
  },
  initial: ({ initialPosition, currentPosition, containerWidth }) => {
    const scaleFactor = initialPosition.width / currentPosition.width
    const fontScaleFactor = containerWidth / currentPosition.width

    return {
      x: initialPosition.x - currentPosition?.x,
      y: initialPosition.y - currentPosition?.y,
      scale: scaleFactor,
      fontSize: `${1 / fontScaleFactor}em`,
    }
  },
}

const Tile = ({ project, state, active }: { project: ProjectType; state: State; active: boolean }) => {
  const tileRefPosition = useRef<HTMLDivElement>()
  const [currentPosition, setCurrentPosition] = useState<DOMRect>()
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (tileRefPosition.current) setCurrentPosition(tileRefPosition.current.getBoundingClientRect())
  }, [tileRefPosition.current])

  const initialPosition = state ? state.positions[project.name] : undefined
  const containerWidth = state ? state.containerWidth : 0

  const { width } = useScreenSize()
  const { breakpoints } = useTheme()
  const isMobile = width <= breakpoints.MAX_TABLET

  /**
   * to properly animate from previous position to current grid we need to know elements' boundingRect,
   * which we get by useRef
   * to do this we first render placeholder elements that have the same sizes and opacity:0 (to prevent gliches),
   *  and then from their positions we calculate proper animation
   */
  return (
    <WrapperWrapper ref={tileRefPosition} style={{ zIndex: active ? 1 : 0 }}>
      {''}
      {currentPosition ? (
        <TileWrapper
          variants={TileVariants}
          custom={{ initialPosition, currentPosition, containerWidth }}
          initial={initialPosition ? ['initial', 'inactive'] : ['grid', 'inactive']}
          animate={['grid', isMobile || clicked ? 'active' : 'inactive']}
          exit={'inactive'}
          whileHover={'active'}
          onClick={() => setClicked((v) => !v)}
        >
          <ProjectTile project={project} />
        </TileWrapper>
      ) : (
        <ProjectTile project={project} style={{ opacity: 0 }} />
      )}
    </WrapperWrapper>
  )
}

const WrapperWrapper = styled.div`
  max-width: 450px;
  min-width: 250px;
  width: 100%;
  margin: 1em;
`

const TilesContainer = styled(motion.div)`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 0.5em;

  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.MAX_MOBILE}px) {
    grid-template-columns: 1fr;
  }
`

const TileWrapper = styled(motion.div)`
  display: flex;

  position: relative;
  max-width: 450px;
  min-width: 250px;
  width: 100%;
  flex-shrink: 1;

  transform-origin: top left;
`
