import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

const DIFFRENCE = 20
const SRC = '../resources/images/Me.png'

export default function VulfyPicture() {
  return (
    <Wrapper>
      {[2, 1, 0].map((i) => {
        return (
          <StaticImage
            src={SRC}
            alt="Me"
            placeholder="blurred"
            layout="fullWidth"
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
