import { motion } from 'framer-motion'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const isBrowser = typeof window !== 'undefined'

const translations = [
  { x: 25, y: -30, z: 5 },
  { x: -20, y: 0, z: 10 },
  { x: 10, y: 30, z: 5 },
  { x: 20, y: 0, z: 15 },
]

type MouseActiveImagesProps = {
  images: Array<{ gatsbyImageData: IGatsbyImageData }>
}

export default function MouseActiveImages({ images }: MouseActiveImagesProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // gets invoked only in browser, not in SSR
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({
      x: (e.x - window.innerWidth / 2) / window.innerWidth,
      y: (e.y - window.innerHeight / 2) / window.innerHeight,
    })
  }
  useEffect(() => {
    isBrowser && window.addEventListener('mousemove', handleMouseMove)
    return () => isBrowser && window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const imageTranslations = translations.map((translation) => ({
    x: `${translation.x + translation.z * mousePosition.x}%`,
    y: `${translation.y + translation.z * mousePosition.y}%`,
  }))

  return (
    <Wrapper>
      {images.slice(0, 3).map(({ gatsbyImageData }, i: number) => (
        <ImageWrapper index={i} key={i} animate={{ ...imageTranslations[i] }} initial={{ x: 0, y: 0 }}>
          <ImageElement image={gatsbyImageData} alt={`image ${i}`} />
        </ImageWrapper>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 500px;
  height: fit-content;
  /* padding-left: 100px; */
  margin: 20% auto;
`

const ImageWrapper = styled(motion.div)<{ index: number }>`
  width: 100%;
  height: fit-content;

  position: ${(props) => (!props.index ? 'relative' : 'absolute')};

  border-radius: 0.75em;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.hard};

  transform: translate(0, 0);
`

const ImageElement = styled(GatsbyImage)``
