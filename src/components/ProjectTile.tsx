import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, Variants } from 'framer-motion'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { forwardRef, useRef } from 'react'
import styled from 'styled-components'
import { ProjectType } from '../typescript'
import getRandomElement from '../utils/getRandomElement'
import Button from './Button'
import IconButton from './IconButton'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'

import { PATH } from '../templates/ProjectPage'

const ProjectIconsVariants: Variants = {
  active: {
    opacity: 1,
    pointerEvents: 'all',
  },
  inactive: {
    opacity: 0,
    pointerEvents: 'none',
  },
}

const TitleVariants: Variants = {
  active: {
    y: '0%',
    filter: 'brightness(1)',
  },
  inactive: {
    y: '50%',
    filter: 'brightness(0.7)',
  },
}

type ProjectTileProps = {
  project: ProjectType
  active?: boolean
  [key: string]: any
}

export default forwardRef<HTMLDivElement, ProjectTileProps>(function ProjectTile(
  { project: { images, name, skills, link, repository, brief }, active },
  forwardedRef
) {
  const image = useRef(getRandomElement(images).gatsbyImageData)

  return (
    <Tile ref={forwardedRef}>
      <BlurOverlay blurred={active}>
        <Image image={image.current} alt={name} />
      </BlurOverlay>

      <NameOverlay>
        <motion.div variants={TitleVariants}>
          <div style={{ fontSize: '1.9em', margin: '0.2em', textAlign: 'center' }}>{name}</div>
          <div>{brief}</div>
        </motion.div>

        <motion.div variants={ProjectIconsVariants}>
          <div style={{ display: 'flex', fontSize: '1.5em' }}>
            <IconButton as={'a'} href={repository}>
              <FontAwesomeIcon icon={faGithub} />
            </IconButton>
            <IconButton as={'a'} href={link}>
              <FontAwesomeIcon icon={faLink} />
            </IconButton>
          </div>
          <Button as={Link} to={`${PATH}${name}`} style={{ margin: '0.3em' }}>
            Read more
          </Button>
        </motion.div>
      </NameOverlay>
    </Tile>
  )
})

const Tile = styled.div`
  height: fit-content;
  border-radius: 0.75em;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.hard};
`

const NameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  width: 100%;
  height: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.MAX_TABLET}px) {
    font-size: 0.8em;
  }
`

const BlurOverlay = styled.div<{ blurred: boolean }>`
  display: block;

  overflow: hidden;

  width: 100%;
  height: 100%;

  filter: blur(1px) brightness(0.3);
  ${(props) => (props.blurred ? 'filter: blur(0) brightness(0.5)' : '')};
  transition: 0.3s 0.3s filter;
`

const Image = styled(GatsbyImage)``
