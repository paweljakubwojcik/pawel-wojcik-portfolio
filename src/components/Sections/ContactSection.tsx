import React, { useState } from 'react'
import styled from 'styled-components'
import Section from '../Section'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faEnvelope, faPhone, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'
import { useRef } from 'react'
import { PropsFromSnapscrollSection } from '../../typescript'
import { motion, MotionValue, useTransform } from 'framer-motion'

export default function ContactSection({ visible, wholeView, motionValue, ...rest }: PropsFromSnapscrollSection) {
  return (
    <CustomSection progress={motionValue} {...rest}>
      <Section.Column>
        <Section.Title>Contact</Section.Title>
        <Section.Paragraph>Get in touch</Section.Paragraph>
      </Section.Column>
      <Section.Column>
        <ContactField icon={faEnvelope} progress={motionValue}>
          {'pawel.jakub.wojcik@gmail.com'}
        </ContactField>
        <ContactField icon={faPhone} progress={motionValue}>
          {'724848174'}
        </ContactField>
      </Section.Column>
    </CustomSection>
  )
}

const ContactField = ({
  children,
  icon,
  progress,
}: {
  children: string
  icon: IconDefinition
  progress: MotionValue
}) => {
  const field = useRef<HTMLInputElement>()
  const [copied, setCopied] = useState<boolean>()
  const width = useTransform(progress, [0, 0.7, 1], ['0em', '0em', '13em'])

  const copyToClipboard = () => {
    field.current.select()
    document.execCommand('copy')
    field.current.blur()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    console.log('copied to clipboard')
  }

  return (
    <Container>
      <FontAwesomeIcon icon={icon} />

      <OnlyReadInput value={children} readOnly ref={field} />
      <Button
        title={'copy to clipboard'}
        icon={faCopy}
        style={{ fontSize: '0.7rem' }}
        onClick={copyToClipboard}
        clicked={copied}
      >
        {'Copy'}
      </Button>
      <After style={{ width }} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  margin: 1em;

  position: relative;
`
const After = styled(motion.div)`
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  width: 13em;
  height: 0.3em;
  border-radius: 1000px;
  /* transform: translateY(-100%); */
  background-color: ${(props) => props.theme.colors.palette.pink.main};
`

const OnlyReadInput = styled.input`
  padding: 0.2em;
  margin: 0.5em;
  max-width: 80%;

  color: ${(props) => props.theme.colors.font.main};
  border: none;
  background-color: transparent;

  &:focus {
    outline: ${(props) => props.theme.colors.palette.pink.main} solid;
  }
`

const CustomSection = styled(Section)`
  @media (max-width: ${900}px) {
    flex-direction: column;
  }
`
