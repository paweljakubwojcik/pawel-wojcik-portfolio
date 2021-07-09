import { graphql, Link } from 'gatsby'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled, { useTheme } from 'styled-components'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import ParallaxGatsbyImage from '../components/ParallaxGatsbyImage'
import MediaQuery from '../components/MediaQuery'
import useElementSize from '../hooks/useElementSize'
import Button from '../components/Button'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'

export const PATH = '/projects/'

type ProjectPageProps = {
  data: {
    project: {
      name: string
      description: string
      brief: string
      link: string
      repository: string
      images: {
        id: string
        url: string
        gatsbyImageData: IGatsbyImageData
      }[]
      skills: {
        name: string
        icon: {
          url: string
        }
      }[]
    }
    otherProjectPages: {
      nodes: {
        name: string
        images: {
          gatsbyImageData: IGatsbyImageData
        }[]
      }[]
    }
  }
}

export default function ProjectPage({ data: { project, otherProjectPages } }: ProjectPageProps) {
  const [{ height: backgroundImageHeight }, headerRef] = useElementSize({ height: '8em' })
  const { breakpoints } = useTheme()

  return (
    <Wrapper>
      <SectionName>My projects</SectionName>
      <BackgroundImage
        image={project.images[0].gatsbyImageData}
        alt={project.name}
        style={{ height: backgroundImageHeight }}
      />

      <Header ref={headerRef}>
        <h2>{project.name}</h2>
        <p>{project.brief}</p>
      </Header>

      <ContentWrapper>
        <Description>
          <ReactMarkdown>{project.description}</ReactMarkdown>
          <Buttons>
            <Button icon={faGithub} as={'a'} href={project.repository} target="_blank">
              Code
            </Button>
            <Button icon={faLink} as={'a'} href={project.link} target="_blank">
              Live Demo
            </Button>
          </Buttons>
        </Description>

        <MediaQuery query={`(min-width: ${0}px)`}>
          <ImagesWrapper>
            {project.images.slice(0, 3).map(({ gatsbyImageData }, i) => (
              <ImageElement image={gatsbyImageData} alt={project.name} index={i} key={i} />
            ))}
          </ImagesWrapper>
        </MediaQuery>
      </ContentWrapper>

      <SectionName>Other projects</SectionName>
      <section style={{ display: 'felx', margin: '1em 0' }}>
        {otherProjectPages.nodes.map((node, i) => (
          <Link to={PATH + node.name} key={i}>
            {node.name}
          </Link>
        ))}
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1em 4em;
  max-width: 100vw;
  @media (max-width: ${(props) => props.theme.breakpoints.MAX_TABLET}px) {
    padding: 1em 2em;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.MAX_MOBILE}px) {
    padding: 1em 0em;
  }
`
const BackgroundImage = styled(ParallaxGatsbyImage)`
  width: 100%;
  height: 8em;
  position: absolute;
  left: 0;
`

const Header = styled.header`
  width: 100%;
  max-width: 700px;
  padding-top: 1.4em;
  padding-bottom: 0.5em;
  margin-bottom: 1em;
`

const ContentWrapper = styled.section`
  display: flex;
  min-height: 30vh;

  margin-bottom: 3em;

  @media (max-width: ${1000}px) {
    flex-direction: column-reverse;
  }
`

const Description = styled.div`
  max-width: 600px;
  width: 100%;
  font-size: 0.9em;
`

const ImageTranslations = [
  { x: '25%', y: '-30%' },
  { x: '-20%', y: '0%' },
  { x: '10%', y: '30%' },
]

const ImagesWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 200px;
  margin: 2em;
  @media (max-width: ${(props) => props.theme.breakpoints.MAX_TABLET}px) {
    margin: 1em 0;
  }
`

const ImageElement = styled(GatsbyImage)<{ index: number }>`
  width: 60vw;
  max-width: 400px;
  border-radius: 0.5em;
  position: absolute;
  transform: translate(${(props) => ImageTranslations[props.index].x}, ${(props) => ImageTranslations[props.index].y});
  box-shadow: ${(props) => props.theme.shadows.hard};
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
  & > * {
    margin-right: 1em;
  }
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
