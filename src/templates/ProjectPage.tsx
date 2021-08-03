import { graphql, Link } from 'gatsby'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled, { useTheme } from 'styled-components'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import ParallaxGatsbyImage from '../components/ParallaxGatsbyImage'
import useElementSize from '../hooks/useElementSize'
import Button from '../components/Button'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { ProjectType } from '../typescript'
import Seo from '../components/Seo'
import MouseActiveImages from '../components/MouseActiveImages'
import PageScrollWrapper from '../components/PageScrollWrapper'
import MediaQuery from '../components/MediaQuery'

export const PATH = '/projects/'

type ProjectPageProps = {
  data: {
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
  location: {
    state: {
      position: DOMRect
    }
  }
}

export default function ProjectPage({ data: { project, otherProjectPages }, location: { state } }: ProjectPageProps) {
  console.log(state?.position)
  const { breakpoints } = useTheme()

  return (
    <PageScrollWrapper>
      <Wrapper>
        <Seo title={`${project.name}`} description={project.brief} />
        {/* <SectionName>My projects</SectionName> */}
        <div>
          <Header>
            <h2>{project.name}</h2>
            <p>{project.brief}</p>
          </Header>
          <MediaQuery query={`(max-width:${breakpoints.MAX_TABLET}px)`}>
            <MouseActiveImages images={project.images} />
          </MediaQuery>
          <Skills>
            {project.skills.map((skill) => (
              <Badge>{skill.name}</Badge>
            ))}
          </Skills>
          <Buttons>
            <Button icon={faGithub} as={'a'} href={project.repository} target="_blank">
              Code
            </Button>
            <Button icon={faLink} as={'a'} href={project.link} target="_blank">
              Live Demo
            </Button>
          </Buttons>
          <Description>
            <ReactMarkdown>{project.description}</ReactMarkdown>
          </Description>
        </div>
        <div>
          <MediaQuery query={`(min-width:${breakpoints.MIN_LAPTOP}px)`}>
            <MouseActiveImages images={project.images} />
          </MediaQuery>
        </div>

        {/* <SectionName>Other projects</SectionName>
        <section style={{ display: 'felx', margin: '1em 0' }}>
          {otherProjectPages.nodes.map((node, i) => (
            <Link to={PATH + node.name} key={i} style={{ margin: '0.4em', display: 'block' }}>
              {node.name}
            </Link>
          ))}
        </section> */}
      </Wrapper>
    </PageScrollWrapper>
  )
}

const Wrapper = styled.div`
  padding: 1em 4em;
  max-width: 100vw;
  min-height: calc(100vh - 100px);

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(auto-fit, 1fr);

  align-content: center;
  justify-content: center;

  @media (max-width: ${(props) => props.theme.breakpoints.MAX_TABLET}px) {
    padding: 1em 2em;
    grid-template-columns: repeat(1, 1fr);
  }
  @media (max-width: ${(props) => props.theme.breakpoints.MAX_MOBILE}px) {
    padding: 1em var(--content-global-padding);
  }
`

const Header = styled.header`
  width: 100%;
  max-width: 700px;
  padding-top: 1.4em;
  padding-bottom: 0.5em;
  margin-bottom: 1em;
`

const GridItem = styled.div<{ name: string }>`
  grid-area: ${(props) => props.name};
`

const Description = styled.div`
  max-width: 600px;
  width: 100%;
  font-size: 0.9em;
  text-align: justify;

  li {
    list-style-type: upper-roman;
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

const Buttons = styled.div`
  display: flex;
  margin: 1em 0;
  & > * {
    margin-right: 1em;
  }
`

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  font-size: 0.8em;
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
