import * as React from 'react'
import Seo from '../components/Seo'
import Section from '../components/Section'
import SnapScrollContainer from '../components/SnapScroll/SnapScrollContainer'
import Canvas from '../components/ThreeJS/Canvas'
import ProjectsSection from '../components/Sections/ProjectsSection'
import ContactSection from '../components/Sections/ContactSection'

import smoothscroll from 'smoothscroll-polyfill'
import AboutSection from '../components/Sections/AboutSection'

// pollyfill for safari, and other browsers that doesn't support smooth scroll
if (typeof window !== 'undefined') smoothscroll.polyfill()

export default function IndexPage() {
  return (
    <>
      <Seo title="Portfolio" />
      <SnapScrollContainer>
        <HomeSection id={'Home'} />

        <ProjectsSection id="Projects" />

        <AboutSection id="About" />

        <ContactSection id={'Contact'} />
      </SnapScrollContainer>
    </>
  )
}

const HomeSection = ({ ...props }) => (
  <Section {...props}>
    <Section.Column>
      <Section.Title>Paweł Wójcik</Section.Title>
      <Section.SubTitle>Web Developer</Section.SubTitle>
      <Section.Paragraph>Take your ideas to the moon 🚀</Section.Paragraph>
    </Section.Column>

    <Canvas />
  </Section>
)
