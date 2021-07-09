import React, { useEffect, useRef, useState } from 'react'

import styled from 'styled-components'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { GatsbyImage, IGatsbyImageData, StaticImage } from 'gatsby-plugin-image'
import { PATH } from '../templates/ProjectPage'
import getRandomElement from '../utils/getRandomElement'

import Section from './Section'
import IconButton from './IconButton'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, Variants } from 'framer-motion'
import Button from './Button'

type ProjectType = {
  name: string
  brief: string
  images: {
    gatsbyImageData: IGatsbyImageData
  }[]
  link: string
  repository: string
  skills: {
    name: string
    icon: {
      url: string
    }
  }[]
}

type ProjectSectionQuery = {
  allGraphCmsProject: {
    nodes: ProjectType[]
  }
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

  const [active, setActive] = useState(0)
  const animationInterval = useRef<NodeJS.Timeout>()

  const startAnimation = () => {
    clearInterval()
    animationInterval.current = setInterval(() => {
      setActive((p) => (p + 1) % 3)
    }, 5000)
  }

  const stopAnimation = () => {
    clearInterval(animationInterval.current)
  }

  useEffect(() => {
    startAnimation()
    return () => stopAnimation()
  }, [])

  return (
    <>
      <Section.Column>
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
            <Project project={project} active={i === active} key={i} index={i} onClick={() => setActive(i)} />
          ))}
        </ImagesList>
      </Section.Column>
    </>
  )
}

const Positions = [
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
    ...Positions[index],
    position: 'absolute',
    zIndex: 0,
  }),
}

const ProjectIconsVariants: Variants = {
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0,
    pointerEvents: 'none',
  },
}

const TitleVariants = {
  active: {
    y: '0%',
  },
  inactive: {
    y: '50%',
  },
}

const Project = ({
  project: { images, name, skills, link, repository, brief },
  active = false,
  index,
  ...rest
}: {
  project: ProjectType
  active?: boolean
  index: number
  onClick: () => void
}) => {
  const image = useRef(getRandomElement(images).gatsbyImageData)

  return (
    <ImageWrapper
      variants={ProjectVariants}
      animate={active ? 'active' : 'inactive'}
      custom={index}
      transition={{ duration: 0.6, bounce: 0.4, type: 'spring' }}
      {...rest}
    >
      <Image image={image.current} alt={name} blurred={active} />

      <NameOverlay>
        <motion.div variants={TitleVariants} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '2em', margin: '0.5em' }}>{name}</div>
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

const ImagesList = styled.div`
  display: flex;
  position: relative;
  @media (max-width: ${(props) => props.theme.breakpoints.MAX_TABLET}px) {
    display: grid;
    justify-items: center;
    align-items: center;

    gap: 0.5em;
    grid-template-columns: repeat(2, 1fr);
  }
`

const ImageWrapper = styled(motion.div)`
  position: relative;
  top: 0;
  left: 0;

  color: ${(props) => props.theme.colors.font.main};
`

const NameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`

const Image = styled(GatsbyImage)<{ blurred: boolean }>`
  img {
    filter: blur(1px) brightness(0.3);
  }

  box-shadow: ${(props) => props.theme.shadows.hard};
`
