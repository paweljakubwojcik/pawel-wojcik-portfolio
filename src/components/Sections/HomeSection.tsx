import React, { useRef } from 'react'
import Section from '../Section'
import Scene from '../ThreeJS/Scene'
import { PropsFromSnapscrollSection } from '../../typescript'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { motion, useTransform } from 'framer-motion'

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

      <Scene animation={visible} parent={sectionRef.current} />
      <MotionContainer style={{ translateY, opacity: motionValue }}>
        <CallToAction>
          <FontAwesomeIcon icon={faArrowDown} />
        </CallToAction>
      </MotionContainer>
    </Section>
  )
}

const MotionContainer = styled(motion.div)`
  position: absolute;
  top: 80vh;
  left: 50%;
`

const opacityAnim = keyframes`
  from{
    opacity: 0;
    transform: translate(-50%, -100%);
  }
  to{
    opacity: 0.5;
    transform: translate(-50%, -0%);
  }
`
const size = 3
const CallToAction = styled.div`
  --size: ${size}rem;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: translate(-50%, -100%);
  opacity: 0;

  font-size: ${0.6 * size}rem;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;

  background-color: ${(props) => props.theme.colors.palette.pink.dark};
  animation: ${opacityAnim} 0.4s 2s forwards;
`
