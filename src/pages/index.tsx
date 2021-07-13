import * as React from 'react'
import Seo from '../components/Seo'
import Section from '../components/Section'
import SnapScrollContainer from '../components/SnapScrollContainer'
import VulfyPicture from '../components/VulfyPicture'
import Canvas from '../components/ThreeJS/Canvas'
import MediaQuery from '../components/MediaQuery'
import ProjectsSection from '../components/ProjectsSection'
import { useTheme } from 'styled-components'
import ContactSection from '../components/ContactSection'

const IndexPage = () => {
  const { breakpoints } = useTheme()

  return (
    <>
      <Seo title="Home" />
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
          <Section.Column>
            <Section.Title>About Me</Section.Title>
            <Section.Paragraph>
              Hi , this is some important info about me, that recruters would like to know
            </Section.Paragraph>
          </Section.Column>
          <MediaQuery query={`(min-width: ${breakpoints.MIN_LAPTOP}px)`}>
            <Section.Column>
              <VulfyPicture />
            </Section.Column>
          </MediaQuery>
        </Section>

        <ContactSection _id={'Contact'} />
      </SnapScrollContainer>
    </>
  )
}

export default IndexPage
