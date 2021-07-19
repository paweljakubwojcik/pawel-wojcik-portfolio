import React, { ComponentProps, ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import { SectionActiveContext } from './SnapScrollContainer'
import { useContext } from 'react'
import { AnimatePresence, motion, MotionProps } from 'framer-motion'
import { useState } from 'react'

type SnapScrollSectionProps = {
  children: React.ReactNode
  id: string
}

export default function SnapScrollSection({ children, id, ...props }: SnapScrollSectionProps) {
  const { hash } = useLocation()
  const { active, setActive, keyToHash } = useContext(SectionActiveContext)
  const [intersectionRatio, setIntersectionRatio] = useState(0)

  /*   const { setRef, visible } = useIntersectionObserver(
    (entry) => {
      if (!visible && entry.intersectionRatio < 0.1 && active === hashToKey(hash)) {
        setTarget(id)
      }
      if (entry.intersectionRatio > 0.9 && target === id) {
        setActive(id)
      }
    },
    { threshold: [0.01, 0.9] }
  )
 */
  const { setRef, visible } = useIntersectionObserver(
    (entry) => {
      if (!visible) {
        if (keyToHash(active) === hash) {
          navigate(keyToHash(id) || '/', { replace: true })
        }
      } else {
        setActive(id)
      }
    },
    { threshold: [0.9] }
  )

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { visible, wholeView: visible })
    }
    return child
  })

  return (
    <Container ref={setRef} {...props}>
      {childrenWithProps}
    </Container>
  )
}

const Container = styled.div`
  display: flex;

  height: 100vh;
  width: 100%;
`
