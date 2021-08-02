import { motion, Variants } from 'framer-motion'
import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import styled from 'styled-components'
import ProjectTile from '../components/ProjectTile'
import PageScrollWrapper from '../components/PageScrollWrapper'
import Seo from '../components/Seo'
import { useTheme } from '../context/theme'
import useScreenSize from '../hooks/useScreenSize'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
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
  data: { allGraphCmsProject: { nodes: ProjectType[] } }
}

export const query = graphql`
  query AllProjects {
    allGraphCmsProject {
      nodes {
        name
        description
        brief
        images {
          gatsbyImageData(width: 600, placeholder: BLURRED, aspectRatio: 1.77)
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
`

export default function projects({
  location: { state },
  data: {
    allGraphCmsProject: { nodes: projects },
  },
}: projectsPageProps) {
  return (
    <PageScrollWrapper>
      <Seo title={'Projects'} />
      <TilesContainer animate={{ transition: { staggerChildren: 1 } }} exit={{ transition: { staggerChildren: 1 } }}>
        {projects.map((project, i) => (
          <Tile project={project} state={state} active={i === state?.active} key={project.name} index={i} />
        ))}
      </TilesContainer>
    </PageScrollWrapper>
  )
}

const TileVariants: Variants = {
  grid: ({ index }) => ({
    x: 0,
    y: 0,
    scale: 1,
    fontSize: '1em',
    transition: {
      type: 'spring',
      duration: 0.7,
      delay: index * 0.05 + 0.1,
    },
  }),
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

const Tile = ({
  project,
  state,
  active,
  index,
}: {
  project: ProjectType
  state: State
  active: boolean
  index: number
}) => {
  const tileRefPosition = useRef<HTMLDivElement>()
  const [currentPosition, setCurrentPosition] = useState<DOMRect>()
  const [clicked, setClicked] = useState(false)
  const [navigatingTo, setNavigatingTo] = useState(false)
  const [opacity, setOpacity] = useState(1)
  const { setRef } = useIntersectionObserver(
    (entry) => {
      setOpacity(entry.intersectionRatio)
    },
    {
      threshold: new Array(20).fill(0).map((v, i) => i / 20),
    }
  )

  useEffect(() => {
    if (tileRefPosition.current) setRef(tileRefPosition.current)
  }, [tileRefPosition.current])

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
    <WrapperWrapper ref={tileRefPosition} style={{ zIndex: active ? 1 : 0, opacity }}>
      {''}
      {currentPosition ? (
        <TileWrapper
          variants={TileVariants}
          custom={{ initialPosition, currentPosition, containerWidth, index }}
          initial={initialPosition ? ['initial', 'inactive'] : ['grid', 'inactive']}
          animate={['grid', isMobile || clicked ? 'active' : 'inactive']}
          exit={navigatingTo ? {} : { opacity: 0, y: '60%', transition: { duration: 0.7 } }}
          whileHover={'active'}
          onClick={() => setClicked((v) => !v)}
        >
          <ProjectTile project={project} setClicked={() => setNavigatingTo(true)} />
        </TileWrapper>
      ) : (
        /* placeholder */
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

  overflow: visible;

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
