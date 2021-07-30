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
import Seo from '../components/Seo'
import { ProjectType } from '../typescript'

// on transition get all positions of images and store them in map/object where keys are names of projects

type State = {
  positions: {
    [key: string]: {
      x: number
      y: number
      width: number
      height: number
    }
  }
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

  console.log(state)

  return (
    <>
      <Seo title={'Projects'} />
      <TilesContainer>
        {projects.map((project) => (
          <Tile project={project} state={state} key={project.name} />
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
  },
  inactive: ({ initialPosition, currentPosition }) => ({
    x: initialPosition.x - currentPosition?.x,
    y: initialPosition.y - currentPosition?.y,
    scale: currentPosition ? initialPosition.width / currentPosition.width : 1,
  }),
}

const Tile = ({ project, state }: { project: ProjectType; state: State }) => {
  const tileRefPosition = useRef<HTMLDivElement>()
  const [currentPosition, setCurrentPosition] = useState<DOMRect>()

  useEffect(() => {
    if (tileRefPosition.current) setCurrentPosition(tileRefPosition.current.getBoundingClientRect())
  }, [tileRefPosition.current])

  const initialPosition = state.positions[project.name]

  // initial position is statePosition - currentPosition

  console.log({ project: project.name, position: initialPosition, position2: currentPosition })

  return (
    <WrapperWrapper ref={tileRefPosition}>
      {''}
      {currentPosition ? (
        <TileWrapper
          variants={TileVariants}
          custom={{ initialPosition, currentPosition }}
          initial={'inactive'}
          animate={'grid'}
          exit={'inactive'}
          whileHover={'active'}
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
