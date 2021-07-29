import React, { ComponentProps, ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import { SectionActiveContext } from './SnapScrollContainer'
import { useContext } from 'react'
import { MotionValue, useTransform } from 'framer-motion'
import getScrollMapping from '../../utils/getScrollMapping'

type SnapScrollSectionProps = {
  children: React.ReactNode
  id: string
  scrollYProgress: MotionValue
  index: number
  numberOfSiblings: number
}

export default function SnapScrollSection({
  children,
  id,
  scrollYProgress,
  index,
  numberOfSiblings,
  ...props
}: SnapScrollSectionProps) {
  const { hash } = useLocation()
  const { active, setActive, keyToHash } = useContext(SectionActiveContext)

  const { inputValues, outputValues } = getScrollMapping(index, numberOfSiblings)
  const motionValue = useTransform(scrollYProgress, inputValues, outputValues)

  const { setRef, visible: wholeView } = useIntersectionObserver(
    (entry) => {
      if (!visible) {
        if (keyToHash(active) === hash) {
          navigate(keyToHash(id) || '/', { replace: true })
        }
      } else {
        setActive(id)
      }
    },
    { threshold: [1], rootMargin: '50% 0%' }
  )

  const { setRef: setRef2, visible } = useIntersectionObserver(() => {}, {
    threshold: [0.1],
  })

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { visible, wholeView, motionValue })
    }
    return child
  })

  return (
    <Container
      ref={(reference) => {
        setRef(reference)
        setRef2(reference)
      }}
      {...props}
    >
      {childrenWithProps}
    </Container>
  )
}

const Container = styled.div`
  display: flex;

  height: 100vh;
  width: 100%;
`
