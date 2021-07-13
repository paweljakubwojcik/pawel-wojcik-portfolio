import React, { useState } from 'react'
import styled, { DefaultTheme, StyledComponentProps, keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import useElementSize from '../hooks/useElementSize'

type ButtonProps = {
  icon?: IconProp
  children: React.ReactNode
  clicked?: boolean
} & StyledComponentProps<any, DefaultTheme, {}, never>

const ButtonVariants: Variants = {
  clicked: (size) => ({
    width: size,
    borderRadius: '50%',
    transition: {
      delay: 0.3,
    },
  }),
  initial: {},
}

const TextVariants: Variants = {
  clicked: {
    opacity: 0,
  },
  initial: {
    opacity: 1,
  },
}

export default function Button({ children, icon, clicked, ...props }: ButtonProps) {
  const [{ height }, ref] = useElementSize({ width: '0', height: '0' })

  return (
    <StyledButton
      {...props}
      ref={ref as any}
      custom={height}
      variants={ButtonVariants}
      animate={clicked ? 'clicked' : 'initial'}
      initial={'initial'}
    >
      <Container variants={TextVariants}>
        {icon && <FontAwesomeIcon icon={icon} style={{ fontSize: '1.5em', marginRight: '.2em' }} />}
        {children}
      </Container>
      <AnimatePresence>
        {clicked && (
          <DoneIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 140 150"
              style={{ fontSize: '2em', marginRight: '.2em', display: 'inline-block', height: '1em' }}
            >
              <motion.path
                d="M38 74.707l24.647 24.646L116.5 45.5"
                fill="transparent"
                strokeWidth="20"
                stroke="currentColor"
                strokeLinecap="round"
                animate={{
                  pathLength: 0.9,
                  opacity: 1,
                  transition: { delay: 0.4, duration: 0.4, type: 'spring', bounce: 0.6 },
                }}
                initial={{ pathLength: 0, opacity: 0 }}
              />
            </svg>
          </DoneIcon>
        )}
      </AnimatePresence>
    </StyledButton>
  )
}

const Container = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;

  width: fit-content;
`

const DoneIcon = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;

  width: fit-content;
`

const StyledButton = styled(motion.button)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;

  width: fit-content;

  background: linear-gradient(
    135deg,
    ${(props) => `${props.theme.colors.palette.pink.main}, ${props.theme.colors.palette.violet.light}`}
  );

  padding: 0.5em;

  border-radius: 0.1em;
  color: inherit;

  &:hover {
    filter: brightness(1.1);
  }
  /*  transition: filter 0.4s; */
`
