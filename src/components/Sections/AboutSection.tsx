import * as React from 'react'
import Section from '../Section'
import VulfyPicture from '../VulfyPicture'
import MediaQuery from '../MediaQuery'
import { useTheme } from 'styled-components'
import { PropsFromSnapscrollSection } from '../../typescript'
import { graphql, useStaticQuery } from 'gatsby'

export default function AboutSection({ visible, wholeView, motionValue, ...rest }: PropsFromSnapscrollSection) {
  const { breakpoints } = useTheme()

  const {
    graphCmsContent: { content },
  } = useStaticQuery(graphql`
    query AboutDescription {
      graphCmsContent(name: { eq: "AboutSectionContent" }) {
        name
        content
      }
    }
  `)

  return (
    <Section progress={motionValue} {...rest}>
      <Section.Column>
        <Section.Title>About Me</Section.Title>
        <Section.Paragraph>{content}</Section.Paragraph>
      </Section.Column>
      <MediaQuery query={`(min-width: ${breakpoints.MIN_LAPTOP}px)`}>
        <Section.Column style={{ alignItems: 'center' }}>
          <VulfyPicture visible={wholeView} />
        </Section.Column>
      </MediaQuery>
    </Section>
  )
}
