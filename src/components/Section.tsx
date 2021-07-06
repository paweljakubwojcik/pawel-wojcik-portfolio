import React from 'react'
import styled from 'styled-components'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import { SectionActiveContext } from './SnapScrollContainer'
import { useContext } from 'react'

export type SectionProps = {
  id: string
  children: React.ReactNode
}

const DEFAULT_HASH = '#Home'

export default function Section({ children, id, ...props }: SectionProps) {
  const { hash } = useLocation()
  const locationHash = hash || DEFAULT_HASH
  const { active, setActive } = useContext(SectionActiveContext)

  const { setRef, visible } = useIntersectionObserver(
    (entry) => {
      if (!visible) {
        if (locationHash === active) {
          navigate(`#${id}` !== DEFAULT_HASH ? `/#${id}` : '/')
        }
        setActive(`#${id}`)
      }
    },
    { threshold: 0.2 }
  )

  return (
    <Container ref={setRef} id={id} {...props}>
      {children}
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding-left: 9em;
`
Section.Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  flex-grow: 1;
  height: 100%;
`

Section.Title = styled.h2`
  font-size: 4em;
  margin: 0.4em 0;
`

Section.SubTitle = styled.h3`
  font-size: 2em;
  margin: 1em 0.1rem;
  color: ${(props) => props.theme.colors.palette.pink.main};
`

Section.Paragraph = styled.p`
  font-weight: 100;
  margin: 1em 0.1rem;
`
