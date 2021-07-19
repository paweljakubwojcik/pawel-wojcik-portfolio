import * as React from 'react'
import Seo from '../components/Seo'
import SnapScrollContainer from '../components/SnapScroll/SnapScrollContainer'
import ProjectsSection from '../components/Sections/ProjectsSection'
import ContactSection from '../components/Sections/ContactSection'
import AboutSection from '../components/Sections/AboutSection'
import HomeSection from '../components/Sections/HomeSection'

import smoothscroll from 'smoothscroll-polyfill'

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
