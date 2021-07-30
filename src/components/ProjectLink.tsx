import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react'

import styled from 'styled-components'

import { motion, MotionValue, useMotionTemplate, useTransform, Variants } from 'framer-motion'
import { ProjectType } from '../typescript'
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
  active: () => ({
    x: '0%',
    y: '0%',
    scale: 1,
    cursor: 'default',
    transition: {
      delayChildren: 0.3,
    },
  }),
  inactive: ({ index }) => ({
    x: POSITIONS[index].x + '%',
    y: POSITIONS[index].y + '%',
    scale: POSITIONS[index].scale,
    cursor: 'pointer',
  }),
}

type PojectLinkProps = {
  active?: boolean
  index: number
  inView?: boolean
  motionValue: MotionValue
} & ReactBaseProps

export default forwardRef<HTMLDivElement, PojectLinkProps>(function ProjectLink(
  { active = false, index, inView, motionValue, children, ...rest },
  ref
) {
  const finalScale = useMemo(() => 1 / POSITIONS[index].scale, [index])
  const finalTransfromX = useMemo(() => `${-POSITIONS[index].x * finalScale}%`, [index])
  const finalTransfromY = useMemo(() => `${-POSITIONS[index].y * finalScale}%`, [index])

  const transformValueX = useTransform(motionValue, [0, 0.5, 1], [finalTransfromX, finalTransfromX, '0%'])
  const transformValueY = useTransform(motionValue, [0, 0.5, 1], [finalTransfromY, finalTransfromY, '0%'])
  const transformScale = useTransform(motionValue, [0, 0.5, 1], [finalScale, finalScale, 1])
  const transform = useMotionTemplate`translate(${transformValueX}, ${transformValueY}) scale(${transformScale})`

  return (
    <ImageWrapper
      variants={ProjectVariants}
      animate={active ? 'active' : 'inactive'}
      initial={'inactive'}
      
      custom={{ index }}
      transition={{ duration: 0.6, bounce: 0.4, type: 'spring' }}
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
