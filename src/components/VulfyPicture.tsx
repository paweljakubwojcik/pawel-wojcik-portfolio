import React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'

const DIFFRENCE = 20

export default function VulfyPicture({ visible }) {
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
    <Wrapper visible={visible}>
      {[2, 1, 0].map((i) => {
        return (
          <div
            style={{
              position: i === 0 ? 'static' : 'absolute',
              top: 0,
              left: 0,
              transform: visible ? `translate(${i * DIFFRENCE * 1.2}px, -${i * DIFFRENCE}px)` : 'translate(0px , 0px)',
              opacity: 1 - i * 0.2,
              width: '100%',
              transition: 'transform .4s 0.4s cubic-bezier(.5,.23,.37,1.39)',
            }}
          >
            <GatsbyImage image={file.childImageSharp.gatsbyImageData} alt="Me" key={i} style={{}} />
          </div>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ visible: boolean }>`
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
    height: ${(props) => (props.visible ? '112.5%' : '0%')};
    transition: height 0.5s cubic-bezier(0.5, 0.23, 0.37, 1.39);
    background-color: ${(props) => props.theme.colors.palette.pink.light};
  }
`
