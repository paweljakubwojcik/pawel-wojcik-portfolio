import * as React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Seo from '../components/Seo'
import Section from '../components/Section'
import SnapScrollContainer from '../components/SnapScrollContainer'
import { useEffect } from 'react'

const IndexPage = ({ location }) => {
  return (
    <>
      <Seo title="Home" />
      <SnapScrollContainer>
        <Section id="Home">I'm section 1</Section>
        <Section id="Projects">I'm projects</Section>
        <Section id="About">I'm about</Section>
        <Section id="Contact">I'm contact</Section>
      </SnapScrollContainer>
    </>
  )
}

export default IndexPage
