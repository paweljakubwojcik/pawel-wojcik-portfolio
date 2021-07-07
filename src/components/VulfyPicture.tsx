import React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'

const DIFFRENCE = 20

export default function VulfyPicture() {
  const { file } = useStaticQuery(graphql`
    query Me {
      file(name: { eq: "Me" }) {
        childImageSharp {
          gatsbyImageData(width: 600, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
  `)

  return (
    <Wrapper>
      {[2, 1, 0].map((i) => {
        return (
          <GatsbyImage
            image={file.childImageSharp.gatsbyImageData}
            alt="Me"
            key={i}
            style={{
              position: i === 0 ? 'static' : 'absolute',
              top: 0,
              left: 0,
              transform: `translate(${i * DIFFRENCE * 1.2}px, -${i * DIFFRENCE}px)`,
              opacity: 1 - i * 0.2,
              width: '100%',
            }}
          />
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 300px;
  max-width: 500px;

  transform: translateX(-10%);
  z-index: -1;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 5%;
    left: 25%;
    width: 87.5%;
    height: 112.5%;
    background-color: ${(props) => props.theme.colors.palette.pink.light};
  }
`
