import React from 'react'
import styled, { keyframes } from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

export default function CallToScroll() {
  return (
    <CallToAction>
      <InnerDot />
    </CallToAction>
  )
}

const opacityAnim = keyframes`
  from{
    opacity: 0;
    transform: translate(-50%, -100%);
  }
  to{
    opacity: 0.4;
    transform: translate(-50%, -0%);
  }
`
const size = 2
const CallToAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  transform: translate(-50%, -100%);
  opacity: 0;

  font-size: ${0.35 * size}rem;
  width: ${size}rem;
  height: ${size * 1.3}rem;
  border-radius: 10000px;
  background-color: transparent;
  border: 4px solid;
  border-color: ${(props) => props.theme.colors.palette.pink.light};
  animation: ${opacityAnim} 0.4s 2s forwards;
`

const callToActionAnim = keyframes`
  from{
    transform: translate(0%, 60%);
  }
  to{
    transform: translate(0%, -60%);
  }
`

const InnerDot = styled.div`
  display: block;
  width: 1em;
  height: 1em;
  border-radius: 50%;

  background-color: ${(props) => props.theme.colors.palette.pink.light};

  animation: ${callToActionAnim} 1.3s alternate-reverse infinite;
`
