import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, Variants } from 'framer-motion'
import { graphql, Link, useStaticQuery, navigate } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ProjectType } from '../typescript'
import getRandomElement from '../utils/getRandomElement'
import Button from './Button'
import IconButton from './IconButton'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'

import { PATH } from '../templates/ProjectPage'
import useElementSize from '../hooks/useElementSize'

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
  setClicked?: () => void
  [key: string]: any
}

const FONTSIZE = {
  smoll: '0.7em',
  regular: '1em',
}

export default forwardRef<HTMLDivElement, ProjectTileProps>(function ProjectTile(
  { project: { images, name, skills, link, repository, brief }, active, setClicked },
  forwardedRef
) {
  const image = useRef(getRandomElement(images).gatsbyImageData)

  /* container query functionality TODO: extract it to new component */
  const [{ rect }, elementSizeRef] = useElementSize({})
  const [fontSize, setFontSize] = useState('')

  useEffect(() => {
    /* if (rect) {
      if (rect.width < 360 && fontSize !== FONTSIZE.smoll) {
        setFontSize(FONTSIZE.smoll)
      }
      if (rect.width > 360 && fontSize !== FONTSIZE.regular) {
        setFontSize(FONTSIZE.regular)
      }
    } */
  }, [rect])

  const tileRef = useRef<HTMLElement>()

  const handleClick = (e) => {
    e.preventDefault()
    if (setClicked) setClicked()
    navigate(`${PATH}${name}`, {
      state: {
        position: tileRef.current.getBoundingClientRect(),
      },
    })
  }

  return (
    <Tile ref={forwardedRef}>
      <BlurOverlay blurred={active} ref={tileRef as any}>
        <Image image={image.current} alt={name} />
      </BlurOverlay>

      <NameOverlay ref={elementSizeRef as any}>
        <motion.div variants={TitleVariants}>
          <div style={{ fontSize: '1.9em', margin: '0.2em', textAlign: 'center' }}>{name}</div>
          <div>{brief}</div>
        </motion.div>

        <motion.div variants={ProjectIconsVariants}>
          <div style={{ display: 'flex', fontSize: '1.7em' }}>
            <IconButton as={'a'} href={repository}>
              <FontAwesomeIcon icon={faGithub} />
            </IconButton>
            <IconButton as={'a'} href={link}>
              <FontAwesomeIcon icon={faLink} />
            </IconButton>
          </div>
          <Button as={Link} to={`${PATH}${name}`} onClick={handleClick} style={{ margin: '0.3em', fontSize: '1.2em' }}>
            Read more
          </Button>
        </motion.div>
      </NameOverlay>
    </Tile>
  )
})

const Tile = styled(motion.div)`
  height: fit-content;
  border-radius: 0.75em;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.hard};
  border: 2px solid transparent;
  &:hover {
    border: 2px solid ${(props) => props.theme.colors.palette.violet.light};
  }
  transition: border-color 1s;
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

  font-size: 0.7em;
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
