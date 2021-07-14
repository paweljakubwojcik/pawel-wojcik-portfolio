import * as React from 'react'
import Seo from '../components/Seo'
import Section from '../components/Section'
import SnapScrollContainer from '../components/SnapScrollContainer'
import Canvas from '../components/ThreeJS/Canvas'
import ProjectsSection from '../components/ProjectsSection'
import ContactSection from '../components/ContactSection'

import smoothscroll from 'smoothscroll-polyfill'
import AboutSection from '../components/AboutSection'

// pollyfill for safari, and other browsers that doesn't support smooth scroll
if (typeof window !== 'undefined') smoothscroll.polyfill()

const IndexPage = () => {
  return (
    <>
      <Seo title="Portfolio" />
      <SnapScrollContainer>
        <Section _id="Home">
          <Section.Column>
            <Section.Title>Paweł Wójcik</Section.Title>
            <Section.SubTitle>Web Developer</Section.SubTitle>
            <Section.Paragraph>Take your ideas to the moon 🚀</Section.Paragraph>
          </Section.Column>

          <Canvas />
        </Section>
        <Section _id="Projects">
          <ProjectsSection />
        </Section>
        <Section _id="About">
          <AboutSection />
        </Section>

        <ContactSection _id={'Contact'} />
      </SnapScrollContainer>
    </>
  )
}

export default IndexPage
