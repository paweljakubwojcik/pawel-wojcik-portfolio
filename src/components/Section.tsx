import React, { forwardRef, RefObject } from 'react'
import styled, { StyledComponent } from 'styled-components'
import { motion, MotionProps, MotionValue, useMotionTemplate, useTransform } from 'framer-motion'
import { createContext } from 'react'
import { useContext } from 'react'

export type SectionProps = {
  children: React.ReactNode
  visible?: boolean
  progress: MotionValue
} & MotionProps

const OpacityVariants = {
  inView: {
    opacity: 1,
  },
  outOfView: {
    opacity: 1,
  },
}

const TitleVariants = {
  inView: {
    opacity: 1,
  },
  outOfView: {
    opacity: 0,
  },
}

const ProgressContext = createContext<{ progress: MotionValue }>({
  progress: null,
})

const Section = ({ children, visible = true, progress, ...props }, forwardedRef) => {
  return (
    <ProgressContext.Provider value={{ progress }}>
      <Container
        initial={'outOfView'}
        animate={'inView'}
        exit={'outOfView'}
        variants={OpacityVariants}
        ref={forwardedRef}
        {...props}
      >
        {children}
      </Container>
    </ProgressContext.Provider>
  )
}

/* sub components */

const Container = styled(motion.section)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-left: 9em;
  padding-top: 3em;
  padding-right: var(--content-global-padding);

  overflow: hidden;

  @media (max-width: ${(props) => props.theme.breakpoints.MAX_TABLET}px) {
    padding-left: 7em;
    flex-direction: column;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.MAX_MOBILE}px) {
    padding-left: var(--content-global-padding);
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 100%;
`

const Title = ({ children }) => {
  const { progress } = useContext(ProgressContext)
  const opacity = useTransform(progress, [0, 0.5, 1], [0, 0, 1])

  return <StyledTitle style={{ opacity }}>{children}</StyledTitle>
}

const StyledTitle = styled(motion.h2)`
  font-size: 4em;
  /* margin: 0.4em 0; */
  width: 100%;
  transition: opacity 0.2s;

  position: relative;
  z-index: 1;
`

const SubTitle = styled.h3`
  font-size: 2em;
  /*  margin: 1em 0.1rem; */
  color: ${(props) => props.theme.colors.palette.pink.main};
  position: relative;
  z-index: 1;
`

const Paragraph = styled.p`
  font-weight: 100;
  margin: 1em 0.1rem;
  position: relative;
  z-index: 1;
`

export default Object.assign(forwardRef<HTMLElement, SectionProps>(Section), { Column, Title, Paragraph, SubTitle })
