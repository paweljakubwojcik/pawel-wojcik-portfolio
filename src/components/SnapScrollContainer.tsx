import React, { useRef } from 'react'
import { createContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import MediaQuery from './MediaQuery'
import Navigator from './Navigator'

type SnapScrollContainerProps = {
  children: React.ReactNode
}

export const SectionActiveContext = createContext<{
  active: string
  setActive: React.Dispatch<React.SetStateAction<string>>
}>({ active: '', setActive: () => {} })

export default function SnapScrollContainer({ children }: SnapScrollContainerProps) {
  const { breakpoints } = useTheme()
  const [active, setActive] = useState<string>(window.location.hash || '#Home')

  const keys = (children as Array<JSX.Element>).map(({ props }) => props.id)

  return (
    <SectionActiveContext.Provider value={{ active, setActive }}>
      <Wrapper>
        <>{children}</>
      </Wrapper>
      <MediaQuery query={`(min-width: ${breakpoints.MAX_MOBILE}px)`}>
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
