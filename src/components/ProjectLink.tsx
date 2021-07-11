import React, { useEffect, useRef, useState } from 'react'

import styled from 'styled-components'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { PATH } from '../templates/ProjectPage'
import getRandomElement from '../utils/getRandomElement'

import IconButton from './IconButton'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, Variants } from 'framer-motion'
import Button from './Button'
import { ProjectType } from '../typescript'

const POSITIONS = [
  {
    x: '-40%',
    y: '40%',
    scale: 0.7,
  },
  {
    x: '40%',
    y: '30%',
    scale: 0.6,
  },
  {
    x: '-50%',
    y: '-50%',
    scale: 0.5,
  },
]

const ProjectVariants: Variants = {
  active: () => ({
    x: 0,
    y: 0,
    scale: 1,
    zIndex: 1,
    transition: {
      delayChildren: 0.3,
    },
  }),
  inactive: (index) => ({
    ...POSITIONS[index],
    zIndex: 0,
  }),
}

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

type PojectLinkProps = {
  project: ProjectType
  active?: boolean
  index: number
  onClick: () => void
}

export default function ProjectLink({
  project: { images, name, skills, link, repository, brief },
  active = false,
  index,
  ...rest
}: PojectLinkProps) {
  const image = useRef(getRandomElement(images).gatsbyImageData)

  return (
    <ImageWrapper
      variants={ProjectVariants}
      animate={active ? 'active' : 'inactive'}
      initial={'inactive'}
      custom={index}
      transition={{ duration: 0.6, bounce: 0.4, type: 'spring' }}
      active={active}
      {...rest}
    >
      <BlurOverlay blurred={active}>
        <Image image={image.current} alt={name} />
      </BlurOverlay>

      <NameOverlay>
        <motion.div variants={TitleVariants} style={{}}>
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
    </ImageWrapper>
  )
}

const ImageWrapper = styled(motion.div)<{ active?: boolean }>`
  position: ${(props) => (props.active ? 'relative' : 'absolute')};
  top: 0;
  left: 0;
  height: fit-content;

  color: ${(props) => props.theme.colors.font.main};
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

const Image = styled(GatsbyImage)`
  box-shadow: ${(props) => props.theme.shadows.hard};
`
