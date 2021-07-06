import { Link } from 'gatsby'
import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'

type NavigatorProps = {
  keys: string[]
}

export default function Navigator({ keys }: NavigatorProps) {
  const location = window.location.hash

  return (
    <Wrapper>
      {keys.map((key, i) => {
        const hash = i !== 0 ? `#${key}` : '/'
        return (
          <NavigatorElement
            key={key}
            to={hash}
            $isActive={location === hash || (i === 0 && !location)}
            title={key}
          />
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
`

const NavigatorElement = styled(Link)<{ $isActive: boolean }>`
  display: block;
  height: 0.4em;
  width: ${(props) => (props.$isActive ? '4em' : '2.5em')};
  border-radius: 1000px;

  margin: 0.5em 0;

  background-color: ${(props) => props.theme.colors.font.main};

  transition: width 0.5s;
`
