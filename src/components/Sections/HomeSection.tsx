import React, { useRef } from 'react'
import Section from '../Section'
import Scene from '../ThreeJS/Scene'
import { PropsFromSnapscrollSection } from '../../typescript'

export default function HomeSection({ motionValue, visible, ...props }: PropsFromSnapscrollSection) {
  const sectionRef = useRef()

  return (
    <Section progress={motionValue} ref={sectionRef} {...props}>
      <Section.Column>
        <Section.Title>Paweł Wójcik</Section.Title>
        <Section.SubTitle>Web Developer</Section.SubTitle>
        <Section.Paragraph>Take your ideas to the moon 🚀</Section.Paragraph>
      </Section.Column>

      <Scene animation={visible} parent={sectionRef.current} />
    </Section>
  )
}
