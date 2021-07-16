import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import IconButton from '../components/IconButton'
import ParallaxGatsbyImage from '../components/ParallaxGatsbyImage'
import useElementSize from '../hooks/useElementSize'

export default function projects() {
  const {
    allGraphCmsProject: { nodes: projects },
  } = useStaticQuery(graphql`
    query AllProjects {
      allGraphCmsProject {
        nodes {
          name
          description
          brief
          images {
            id
            url
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
    <Wrapper>
      <GridWrapper>
        {projects.map((project) => (
          <Project project={project} key={project.name} />
        ))}
      </GridWrapper>
    </Wrapper>
  )
}

const Project = ({ project }) => {
  return (
    <>
      <Title style={{}}>
        <h3 style={{ fontSize: '2em' }}>{project.name} </h3>
        <p style={{ margin: 0 }}>{project.brief}</p>
      </Title>
      <FlexContainer>
        <Button as={Link} to={`${project.name}`} style={{ margin: '0.3em' }}>
          Read more
        </Button>
        <div style={{ display: 'flex', fontSize: '1.5em' }}>
          <IconButton as={'a'} href={project.repository}>
            <FontAwesomeIcon icon={faGithub} />
          </IconButton>
          <IconButton as={'a'} href={project.link}>
            <FontAwesomeIcon icon={faLink} />
          </IconButton>
        </div>
      </FlexContainer>
    </>
  )
}

const Title = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${(props) => props.theme.breakpoints.MAX_TABLET}px) {
    margin-top: 3em;
  }
`

const Wrapper = styled.div`
  display: flex;

  justify-content: center;
  flex-direction: column;
  align-items: center;

  width: 100%;
`

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  width: 100%;
  max-width: 800px;

  margin: 3em 0;

  grid-gap: 1em;
  row-gap: 3em;

  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.MAX_TABLET}px) {
    grid-template-columns: 1fr;
    row-gap: 0em;
  }
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`

const ProjectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 2em 0;
  max-width: 800px;
`

const BackgroundImage = styled(ParallaxGatsbyImage)`
  width: 100%;
  height: 8em;
  position: absolute;
  left: 0;
`
