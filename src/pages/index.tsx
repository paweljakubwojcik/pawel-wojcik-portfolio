import * as React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Seo from '../components/Seo'
import Section from '../components/Section'
import SnapScrollContainer from '../components/SnapScrollContainer'
import { useEffect } from 'react'
import VulfyPicture from '../components/VulfyPicture'
import Moon from '../components/Moon'
import MediaQuery from '../components/MediaQuery'
import { useTheme } from 'styled-components'

const IndexPage = () => {
  const { breakpoints } = useTheme()

  return (
    <>
      <Seo title="Home" />
      <SnapScrollContainer>
        <Section id="Home">
          <Section.Column>
            <Section.Title>Paweł Wójcik</Section.Title>
            <Section.SubTitle>Web Developer</Section.SubTitle>
            <Section.Paragraph>Take your ideas to the moon 🚀</Section.Paragraph>
          </Section.Column>

          <Moon />
        </Section>
        <Section id="Projects">
          <Section.Column>
            <Section.Title>My projects</Section.Title>
            <Section.Paragraph>See what I've been building for the past year</Section.Paragraph>
          </Section.Column>
        </Section>
        <Section id="About">
          <Section.Column>
            <Section.Title>About Me</Section.Title>
            <Section.Paragraph>
              Hi , this is some important info about me, that recruters would like to know
            </Section.Paragraph>
          </Section.Column>
          <MediaQuery query={`(min-width: ${breakpoints.MAX_TABLET}px)`}>
            <Section.Column>
              <VulfyPicture />
            </Section.Column>
          </MediaQuery>
        </Section>
        <Section id="Contact">
          <Section.Column>
            <Section.Title>Contact</Section.Title>
          </Section.Column>
        </Section>
      </SnapScrollContainer>
    </>
  )
}

export default IndexPage
