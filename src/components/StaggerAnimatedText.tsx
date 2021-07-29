import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

type StaggerAnimationTextProps = {
  children: string
}


/**
 * @warning : NOT IN USE
 */
export default forwardRef<any, StaggerAnimationTextProps>(({ children, ...props }, ref) => {
  return (
    <Container variants={containerAnim} ref={ref} {...props}>
      {children.split(' ').map((word, i) => (
        <React.Fragment key={i}>
          <h2 key={i}>
            {word.split('').map((letter, i) => (
              <Span key={i} variants={spanAnim}>
                {letter}
              </Span>
            ))}
            <Span> </Span>
          </h2>
        </React.Fragment>
      ))}
    </Container>
  )
})

const Container = styled(motion.div)`
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
`

const Span = styled(motion.span)`
  display: inline-block;
  white-space: pre;
`

const containerAnim = {
  inView: {
    transition: {
      duration: 0,
      staggerChildren: 0.08,

      staggerDirection: -1,
    },
  },
  outOfView: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const spanAnim = {
  initial: {
    y: '200%',
  },
  inView: {
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
  outOfView: {
    y: '200%',
    transition: {
      duration: 0.5,
      delay: 0.2,
    },
  },
}
