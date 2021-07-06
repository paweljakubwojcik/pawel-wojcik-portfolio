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
            layout="fixed"
            width={400}
            height={400}
            key={i}
            style={{
              position: i === 0 ? 'static' : 'absolute',
              top: 0,
              left: 0,
              transform: `translate(${i * DIFFRENCE * 1.2}px, -${i * DIFFRENCE}px)`,
              opacity: 1 - i * 0.2,
            }}
          />
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 20px;
    left: 100px;
    width: 350px;
    height: 450px;
    background-color: ${(props) => props.theme.colors.palette.pink.light};
  }
`
