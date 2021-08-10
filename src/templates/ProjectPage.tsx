import { graphql, Link } from 'gatsby'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled, { useTheme } from 'styled-components'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { PageProps } from 'gatsby'
import Button from '../components/Button'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { ProjectType, StandardLocationState } from '../typescript'
import Seo from '../components/Seo'
import MouseActiveImages from '../components/MouseActiveImages'
import PageScrollWrapper from '../components/PageScrollWrapper'
import MediaQuery from '../components/MediaQuery'
import { motion, Variants } from 'framer-motion'

export const PATH = '/projects/'

type DataType = {
  project: ProjectType
  otherProjectPages: {
    nodes: {
      name: string
      images: {
        gatsbyImageData: IGatsbyImageData
      }[]
    }[]
  }
}

type LocationState = {
  position: DOMRect
} & StandardLocationState

const StandardVariants: Variants = {
  animate: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  initial: {
    y: '100%',
    opacity: 0,
  },
}

export default function ProjectPage({
  data: { project, otherProjectPages },
  location: { state },
}: PageProps<DataType, {}, LocationState>) {
  const { breakpoints } = useTheme()

  return (
    <PageScrollWrapper>
      <Wrapper initial="initial" animate="animate" exit="exit" transition={{ staggerChildren: 0.3 }}>
        <Seo title={`${project.name}`} description={project.brief} />
        <WrapperColumn>
          <Header variants={StandardVariants}>
            <h2>{project.name}</h2>
            <p>{project.brief}</p>
          </Header>
          <MediaQuery query={`(max-width:${breakpoints.MAX_TABLET}px)`}>
            <MouseActiveImages images={project.images} />
          </MediaQuery>

          <Buttons variants={StandardVariants}>
            <Button icon={faGithub} as={'a'} href={project.repository} target="_blank">
              Code
            </Button>
            <Button icon={faLink} as={'a'} href={project.link} target="_blank">
              Live Demo
            </Button>
          </Buttons>
          <Skills variants={StandardVariants}>
            {project.skills.map((skill) => (
              <Badge key={skill.name}>{skill.name}</Badge>
            ))}
          </Skills>
          <Description variants={StandardVariants}>
            <ReactMarkdown>{project.description}</ReactMarkdown>
          </Description>
        </WrapperColumn>
        <WrapperColumn style={{ position: 'sticky', bottom: 0, zIndex: -1 }}>
          <MediaQuery query={`(min-width:${breakpoints.MIN_LAPTOP}px)`}>
            <MouseActiveImages images={project.images} />
          </MediaQuery>
        </WrapperColumn>

        {/* <SectionName>Other projects</SectionName>
        <section style={{ display: '', margin: '1em 0' }}>
          {otherProjectPages.nodes.map((node, i) => (
            <Link to={PATH + node.name} key={i} style={{ margin: '0.4em', display: 'block' }}>
              {node.name}
            </Link>
          ))}
        </section> */}
        {state?.prevLocation ? <Link to={state.prevLocation}>Go back</Link> : <Link to={'/'}>Go to home page</Link>}
      </Wrapper>
    </PageScrollWrapper>
  )
}

const Wrapper = styled(motion.div)`
  padding: 1em 4em;
  max-width: 100vw;
  min-height: calc(100vh - 100px);

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;

  justify-content: center;

  @media (max-width: ${(props) => props.theme.breakpoints.MAX_TABLET}px) {
    padding: 1em 2em;
    grid-template-columns: repeat(1, 1fr);
  }
  @media (max-width: ${(props) => props.theme.breakpoints.MAX_MOBILE}px) {
    padding: 1em var(--content-global-padding);
  }
`

const WrapperColumn = styled.div`
  position: relative;
  height: fit-content;
  align-self: center;
`

const Header = styled(motion.header)`
  width: 100%;
  max-width: 700px;
  padding-top: 1.4em;
  padding-bottom: 0.5em;
  margin-bottom: 1em;
`

const Description = styled(motion.div)`
  max-width: 600px;
  width: 100%;
  font-size: 0.9em;
  text-align: justify;

  li {
    list-style-type: upper-roman;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.MAX_TABLET}px) {
    max-width: unset;
  }
`

const SectionName = styled.div`
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 100%;
    width: 13em;
    height: 0.5em;
    border-radius: 1000px;
    transform: translateX(-50%);
    background-color: ${(props) => props.theme.colors.palette.pink.main};
  }
`

const Buttons = styled(motion.div)`
  display: flex;
  margin: 1em 0;
  & > * {
    margin-right: 1em;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.MAX_TABLET}px) {
    justify-content: center;
  }
`

const Skills = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  font-size: 0.8em;
  margin: 0.5em -0.3em;
`

const Badge = styled.div`
  width: max-content;
  padding: 0.5em;
  margin: 0.3em;

  border-radius: 0.75em;

  background-color: ${(props) => props.theme.colors.palette.pink.dark};
`

export const query = graphql`
  query SingleProject($name: String) {
    project: graphCmsProject(name: { eq: $name }) {
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

    otherProjectPages: allGraphCmsProject(filter: { name: { ne: $name } }) {
      nodes {
        name
        images {
          gatsbyImageData(placeholder: BLURRED, aspectRatio: 1.77, width: 300)
        }
      }
    }
  }
`
