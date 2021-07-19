import * as React from 'react'
import Section from '../Section'
import VulfyPicture from '../VulfyPicture'
import MediaQuery from '../MediaQuery'
import { useTheme } from 'styled-components'
import { PropsFromSnapscrollSection } from '../../typescript'
import { ReactBaseProps } from 'react-markdown/src/ast-to-react'

export default function AboutSection({ visible, wholeView, ...rest }: PropsFromSnapscrollSection & ReactBaseProps) {
  const { breakpoints } = useTheme()
  return (
    <Section {...rest}>
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
    </Section>
  )
}
