import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

type HamburgerProps = {
  active: boolean
}

const DURATION = 0.5
const EASING = 'easeInOut'

const HamburgerVariants = ({ rotate, y }) => ({
  open: {
    y: [y, '0%', '0%'],
    rotateZ: ['0deg', '0deg', rotate],
  },
  closed: {
    y: ['0%', '0%', y],
    rotateZ: [rotate, '0deg', '0deg'],
  },
})

export default function HamburgerIcon({ active, ...rest }: HamburgerProps) {
  return (
    <Conatiner {...rest} animate={active ? 'open' : 'closed'} initial={false}>
      <Span
        variants={HamburgerVariants({ rotate: '45deg', y: '100%' })}
        initial={{ y: '100%' }}
        transition={{ duration: DURATION, ease: EASING }}
      ></Span>
      <Span
        variants={HamburgerVariants({ rotate: '-45deg', y: '-100%' })}
        initial={{ y: '-100%' }}
        transition={{ duration: DURATION, ease: EASING }}
      ></Span>
    </Conatiner>
  )
}

const Conatiner = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  position: relative;
  z-index: 2;

  width: 30px;
  height: 30px;
`

const Span = styled(motion.span)`
  display: block;

  position: absolute;

  width: 30px;
  height: 6px;
  border-radius: 10000px;
  background-color: ${(props) => props.theme.colors.font.main};
`
