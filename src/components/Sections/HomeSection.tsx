import React from 'react'
import Section from '../Section'
import Canvas from '../ThreeJS/Canvas'

export default function HomeSection({ ...props }) {
  return (
    <Section {...props}>
      <Section.Column>
        <Section.Title>Paweł Wójcik</Section.Title>
        <Section.SubTitle>Web Developer</Section.SubTitle>
        <Section.Paragraph>Take your ideas to the moon 🚀</Section.Paragraph>
      </Section.Column>

      <Canvas />
    </Section>
  )
}
