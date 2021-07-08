import React from 'react'
import Section from './Section'
import styled from 'styled-components'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'

export default function ProjectsSection() {
  const {
    allGraphCmsProject: { nodes: projects },
  } = useStaticQuery(graphql`
    query ProjectsQuery {
      allGraphCmsProject {
        nodes {
          name
          images {
            url
            gatsbyImageData(width: 600, placeholder: BLURRED, aspectRatio: 1.77)
          }
        }
      }
    }
  `)

  return (
    <>
      <Section.Column>
        <Section.Title>My projects</Section.Title>
        <Section.Paragraph>See what I've been building for the past year</Section.Paragraph>
      </Section.Column>
      <Section.Column>
        <ImagesList>
          {projects.map((project) => (
            <Link to={`/projects/${project.name}`}>
              <ImageWrapper key={project.name}>
                <Image image={getRandomElement(project.images).gatsbyImageData} alt={project.name} />
                <NameOverlay>{project.name}</NameOverlay>
              </ImageWrapper>
            </Link>
          ))}
        </ImagesList>
      </Section.Column>
    </>
  )
}

function getRandomElement(array: Array<any>) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

const ImagesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const ImageWrapper = styled.div`
  position: relative;
  width: 300px;
  margin: 0.5em;

  color: ${(props) => props.theme.colors.font.main};

  cursor: pointer;
`

const NameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.4);
`

const Image = styled(GatsbyImage)`
  box-shadow: ${(props) => props.theme.shadows.medium};
`
