import { Link } from 'gatsby'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { motion, MotionValue, useTransform } from 'framer-motion'
import getScrollMapping from '../utils/getScrollMapping'

type NavigatorProps = {
  keys: string[]
  progress: MotionValue
}

export default function Navigator({ keys, progress }: NavigatorProps) {
  return (
    <Wrapper>
      {keys.map((key, i) => (
        <InnerElement key={key} name={key} i={i} keys={keys} progress={progress} />
      ))}
    </Wrapper>
  )
}

const InnerElement = ({ name, i, keys, progress }) => {
  const hash = i !== 0 ? `#${name}` : ''

  const { inputValues, outputValues } = getScrollMapping(i, keys.length)
  const motionValue = useTransform(progress, inputValues, outputValues)
  const width: any = useTransform(motionValue, [0, 1], ['2.5em', '4em'])
  return (
    <NavigatorElement
      to={hash || '/'}
      title={name}
      style={{ width }}
      animate={{ scaleX: 1, transition: { delay: 1 } }}
      exit={{ scaleX: 0 }}
      initial={{ scaleX: 0 }}
    />
  )
}

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
`

const NavigatorElement = styled(motion(Link))`
  display: block;
  height: 0.6em;
  border-radius: 1000px;

  margin: 0.5em 0;

  background-color: ${(props) => props.theme.colors.font.main};
  transform: scaleX(0);
  transform-origin: left;
`
