import * as React from 'react'
import Section from '../Section'
import VulfyPicture from '../VulfyPicture'
import MediaQuery from '../MediaQuery'
import { useTheme } from 'styled-components'
import { PropsFromSnapscrollSection } from '../../typescript'
import { ReactBaseProps } from 'react-markdown/src/ast-to-react'
import { graphql, useStaticQuery } from 'gatsby'

export default function AboutSection({ visible, wholeView, ...rest }: PropsFromSnapscrollSection & ReactBaseProps) {
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
    <Section {...rest}>
      <Section.Column>
        <Section.Title>About Me</Section.Title>
        <Section.Paragraph>{content}</Section.Paragraph>
      </Section.Column>
      <MediaQuery query={`(min-width: ${breakpoints.MIN_LAPTOP}px)`}>
        <Section.Column>
          <VulfyPicture visible={wholeView} />
        </Section.Column>
      </MediaQuery>
    </Section>
  )
}
