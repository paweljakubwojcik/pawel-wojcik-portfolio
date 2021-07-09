import React, { useState } from 'react'
import Section from './Section'
import styled from 'styled-components'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PATH } from '../templates/ProjectPage'
import getRandomElement from '../utils/getRandomElement'
import { useRef } from 'react'

export default function ProjectsSection() {
  const {
    allGraphCmsProject: { nodes: projects },
  } = useStaticQuery<{ allGraphCmsProject: { nodes: { name: string; images: { gatsbyImageData: any }[] }[] } }>(graphql`
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
      <Section.Column style={{ flexGrow: 0, width: 'initial' }}>
        <Section.Title>My projects</Section.Title>
        <Section.Paragraph>See what I've been building for the past year</Section.Paragraph>
      </Section.Column>
      <Section.Column style={{ paddingRight: '2em', flexGrow: 1 }}>
        <ImagesList>
          {projects.map(({ name, images }) => (
            <Project name={name} images={images} />
          ))}
        </ImagesList>
      </Section.Column>
    </>
  )
}

const Project = ({ name, images }: { name: string; images: { gatsbyImageData: any }[] }) => {
  const image = useRef(getRandomElement(images).gatsbyImageData)

  return (
    <Link to={`${PATH}${name}`}>
      <ImageWrapper key={name}>
        <Image image={image.current} alt={name} />
        <NameOverlay>{name}</NameOverlay>
      </ImageWrapper>
    </Link>
  )
}

const ImagesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const ImageWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 250px;
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
  box-shadow: ${(props) => props.theme.shadows.hard};
`
