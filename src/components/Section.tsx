import React from 'react'
import styled from 'styled-components'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import { SectionActiveContext } from './SnapScrollContainer'
import { useContext } from 'react'
import { motion, MotionProps } from 'framer-motion'

export type SectionProps = {
  id: string
  children: React.ReactNode
} & MotionProps

const DEFAULT_HASH = '#Home'

export default function Section({ children, id, ...props }: SectionProps) {
  const { hash } = useLocation()
  const locationHash = hash || DEFAULT_HASH
  const { active, setActive } = useContext(SectionActiveContext)

  const { setRef, visible } = useIntersectionObserver(
    (entry) => {
      if (!visible) {
        if (locationHash === active) {
          navigate(`#${id}` !== DEFAULT_HASH ? `/#${id}` : '/', { replace: true })
        }
        setActive(`#${id}`)
      }
    },
    { threshold: 0.2 }
  )

  const inView = active === `#${id}`

  return (
    <Container ref={setRef} id={id} {...props}>
      {children}
    </Container>
  )
}

const Container = styled(motion.section)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-left: 9em;
  padding-right: var(--content-global-padding);

  @media (max-width: ${(props) => props.theme.breakpoints.MAX_TABLET}px) {
    padding-left: 7em;
    flex-direction: column;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.MAX_MOBILE}px) {
    padding-left: var(--content-global-padding);
  }
`
Section.Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 100%;
`

Section.Title = styled.h2`
  font-size: 4em;
  /* margin: 0.4em 0; */
  width: 100%;

  pointer-events: none;
`

Section.SubTitle = styled.h3`
  font-size: 2em;
  /*  margin: 1em 0.1rem; */
  color: ${(props) => props.theme.colors.palette.pink.main};
  pointer-events: none;
`

Section.Paragraph = styled.p`
  font-weight: 100;
  margin: 1em 0.1rem;
  pointer-events: none;
`
