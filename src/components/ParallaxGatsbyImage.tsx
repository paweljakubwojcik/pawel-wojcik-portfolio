import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { GatsbyImage, GatsbyImageProps } from 'gatsby-plugin-image'

const isBrowser = typeof window !== 'undefined'

export default function ParallaxGatsbyImage({ image, alt, ...props }: GatsbyImageProps) {
  const [translateY, setTranslateY] = useState(0)

  const handleScroll = () => {
    setTranslateY(isBrowser ? window.scrollY : 0)
  }

  useEffect(() => {
    if (isBrowser) {
      window.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (isBrowser) {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <Wrapper {...props}>
      <ParallaxInnerContainer style={{ transform: `translateY(${translateY * 0.5}px)` }}>
        <BackgroundImage image={image} alt={alt} />
      </ParallaxInnerContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  z-index: -1;
  overflow-y: hidden;
  overflow-x: hidden;
`

const ParallaxInnerContainer = styled.div`
  position: absolute;
  width: 100%;
  overflow: visible;
`

const BackgroundImage = styled(GatsbyImage)`
  width: 100%;
  min-width: 800px;
  filter: brightness(0.5);
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: visible;
`
