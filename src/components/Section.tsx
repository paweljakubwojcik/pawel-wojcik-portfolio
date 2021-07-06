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
  justify-content: center;
  align-items: center;
  height: 100%;
`
