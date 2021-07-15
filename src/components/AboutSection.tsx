import * as React from 'react'
import Section from '../components/Section'
import VulfyPicture from '../components/VulfyPicture'
import MediaQuery from '../components/MediaQuery'
import { useTheme } from 'styled-components'

export default function AboutSection({ wholeView }: { wholeView?: boolean }) {
  const { breakpoints } = useTheme()
  return (
    <>
      <Section.Column>
        <Section.Title>About Me</Section.Title>
        <Section.Paragraph>
          Hello there, I’m a junior front-end developer, and student on Warsaw University of Technology. I’ve been
          intensively learning web technologies for the past year. Right now, I’m looking for opportunities to learn new
          and to develop existing skills, by building ambitious project with experienced teams.
        </Section.Paragraph>
      </Section.Column>
      <MediaQuery query={`(min-width: ${breakpoints.MIN_LAPTOP}px)`}>
        <Section.Column>
          <VulfyPicture visible={wholeView} />
        </Section.Column>
      </MediaQuery>
    </>
  )
}
