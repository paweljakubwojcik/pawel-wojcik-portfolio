import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react'

import styled from 'styled-components'
import { navigateDirections } from '../typescript'
import { motion, MotionValue, useMotionTemplate, useTransform, Variants } from 'framer-motion'
import { ReactBaseProps } from 'react-markdown/src/ast-to-react'

const POSITIONS = [
  {
    x: 0,
    y: 0,
    scale: 1,
  },
  {
    x: -40,
    y: 40,
    scale: 0.7,
  },
  {
    x: 40,
    y: 30,
    scale: 0.6,
  },
  {
    x: -50,
    y: -50,
    scale: 0.5,
  },
]

const ProjectVariants: Variants = {
  active: ({ duration }) => ({
    x: '0%',
    y: '0%',
    scale: 1,
    cursor: 'default',
    transition: {
      delayChildren: 0.3,
      duration,
      type: 'spring',
    },
  }),
  inactive: ({ index, duration }) => ({
    x: POSITIONS[index].x + '%',
    y: POSITIONS[index].y + '%',
    scale: POSITIONS[index].scale,
    cursor: 'pointer',
    transition: {
      duration,
      type: 'spring',
    },
  }),
}

type PojectLinkProps = {
  active?: boolean
  index: number
  inView?: boolean
  motionValue: MotionValue
  navigateTo: navigateDirections
} & ReactBaseProps

export default forwardRef<HTMLDivElement, PojectLinkProps>(function ProjectLink(
  { active = false, index, inView, navigateTo, motionValue, children, ...rest },
  ref
) {
  /**
   * every project tile has two wrappers -  one is responsible for interaction with scroll value,
   * another tranlates active/inactive tiles into their places.
   *
   * ImageWrapper - active/inactcive
   * Wrapper - scroll animation
   *
   * Wrapper is hiding inactive tiles behind active one by negating ImageWrapper's transformation
   * that's what final scalew and transform values are for
   *
   */

  const finalScale = useMemo(() => 1 / POSITIONS[index].scale, [index])
  const finalTransfromX = useMemo(() => `${-POSITIONS[index].x * finalScale}%`, [index])
  const finalTransfromY = useMemo(() => `${-POSITIONS[index].y * finalScale}%`, [index])

  const transformValueX = useTransform(motionValue, [0, 0.5, 1], [finalTransfromX, finalTransfromX, '0%'])
  const transformValueY = useTransform(motionValue, [0, 0.5, 1], [finalTransfromY, finalTransfromY, '0%'])
  const transformScale = useTransform(motionValue, [0, 0.5, 1], [finalScale, finalScale, 1])
  const transform = useMotionTemplate`translate(${transformValueX}, ${transformValueY}) scale(${transformScale})`

  const foldUp = navigateTo === navigateDirections.SINGLE_PROJECT

  return (
    <ImageWrapper
      variants={ProjectVariants}
      animate={active ? 'active' : 'inactive'}
      initial={'inactive'}
      exit={foldUp ? 'active' : 'inactive'}
      custom={{ index, duration: foldUp ? 1 : 0.4 }}
      active={active}
      {...rest}
    >
      <Wrapper style={{ transform }} ref={ref}>
        {children}
      </Wrapper>
    </ImageWrapper>
  )
})

const Wrapper = styled(motion.div)`
  top: 0;
  left: 0;
`

const ImageWrapper = styled(motion.div)<{ active?: boolean }>`
  position: ${(props) => (props.active ? 'relative' : 'absolute')};
  top: 0;
  left: 0;
  height: fit-content;
  z-index: ${(props) => (props.active ? 2 : 1)};
  transform: translate(0%, 0%);

  color: ${(props) => props.theme.colors.font.main};
`
