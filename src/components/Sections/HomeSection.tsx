import React, { useRef } from 'react'
import Section from '../Section'
import Scene from '../ThreeJS/Scene'
import { PropsFromSnapscrollSection } from '../../typescript'
import styled, { keyframes } from 'styled-components'

import { motion, useTransform } from 'framer-motion'
import CallToScroll from '../CallToScroll'

export default function HomeSection({ motionValue, visible, ...props }: PropsFromSnapscrollSection) {
  const sectionRef = useRef()
  const translateY = useTransform(motionValue, [0, 1], [-300, 0])

  return (
    <Section progress={motionValue} ref={sectionRef} {...props}>
      <Section.Column>
        <Section.Title>Paweł Wójcik</Section.Title>
        <Section.SubTitle>Web Developer</Section.SubTitle>
        <Section.Paragraph>Take your ideas to the moon 🚀</Section.Paragraph>
      </Section.Column>

      <Scene animation={visible} parent={sectionRef.current} motionValue={motionValue} />
      <MotionContainer style={{ translateY, opacity: motionValue }}>
        <CallToScroll />
      </MotionContainer>
    </Section>
  )
}

const MotionContainer = styled(motion.div)`
  position: absolute;
  top: 85vh;
  left: 50%;
`
