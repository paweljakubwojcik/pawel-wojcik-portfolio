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
          Hi , this is some important info about me, that recruters would like to know
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
