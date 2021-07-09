import React, { useRef } from 'react'
import { createContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import MediaQuery from './MediaQuery'
import Navigator from './Navigator'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'

type SnapScrollContainerProps = {
  children: React.ReactNode
}

export const SectionActiveContext = createContext<{
  active: string
  setActive: React.Dispatch<React.SetStateAction<string>>
}>({ active: '', setActive: () => {} })

export default function SnapScrollContainer({ children }: SnapScrollContainerProps) {
  const location = useLocation()
  const { breakpoints } = useTheme()
  const keys = (children as Array<JSX.Element>).map(({ props }) => props.id)

  const [active, setActive] = useState<string>(`#${keys[0]}`)

  useEffect(() => {
    if (!location.hash) {
      document.getElementById(keys[0]).scrollIntoView()
    } else {
      if (!keys.includes(location.hash.replace('#', ''))) {
        navigate('/', { replace: true })
      }
    }
  }, [location.hash])

  return (
    <SectionActiveContext.Provider value={{ active, setActive }}>
      <Wrapper>
        <>{children}</>
      </Wrapper>
      <MediaQuery query={`(min-width: ${breakpoints.MIN_TABLET}px)`}>
        <Navigator keys={keys} />
      </MediaQuery>
    </SectionActiveContext.Provider>
  )
}

const Wrapper = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  overflow: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    scroll-snap-align: center;
  }
`
