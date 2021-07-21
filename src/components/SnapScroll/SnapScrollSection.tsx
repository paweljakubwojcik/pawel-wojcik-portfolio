import React, { ComponentProps, ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import { SectionActiveContext } from './SnapScrollContainer'
import { useContext } from 'react'
import { MotionValue, useTransform } from 'framer-motion'

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

  /**
   * mapping :
   * 0: [0, 0.33, 0.66 , 1] => [1,0,0,0]
   * 1: [0, 0.33, 0.66 , 1] => [0,1,0,0]
   * 2: [0, 0.33, 0.66 , 1] => [0,0,1,0]
   * 3: [0, 0.33, 0.66 , 1] => [0,0,0,1]
   *
   */

  const inputValues = new Array(numberOfSiblings).fill(0).map((v, i) => i / (numberOfSiblings - 1))
  const outputValues = new Array(numberOfSiblings).fill(0).map((v, i) => (i === index ? 1 : 0))

  const motionValue = useTransform(scrollYProgress, inputValues, outputValues)

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
      return React.cloneElement(child, { visible, wholeView: visible, motionValue })
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
