import React, { Children, useRef } from 'react'
import { createContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import MediaQuery from '../MediaQuery'
import Navigator from '../Navigator'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import SnapScrollSection from './SnapScrollSection'

type SnapScrollContainerProps = {
  children: React.ReactNode
}

const isBrowser = typeof window !== 'undefined'

export const SectionActiveContext = createContext<{
  active: string
  setActive: React.Dispatch<React.SetStateAction<string>>
  target: string
  setTarget: React.Dispatch<React.SetStateAction<string>>
  hashToKey: (hash: string) => string
}>({ active: '', setActive: () => {}, target: '', setTarget: () => {}, hashToKey: (string) => string })

export default function SnapScrollContainer({ children }: SnapScrollContainerProps) {
  const location = useLocation()
  const { breakpoints } = useTheme()
  const keys = (children as Array<JSX.Element>).map(({ props }) => props.id)

  const hashToKey = (hash: string) => (hash ? hash.replace('#', '') : keys[0])
  const keyToHash = (key: string) => (key === keys[0] ? '' : `#${key}`)

  const [active, setActive] = useState<string>(hashToKey(location.hash))
  const [target, setTarget] = useState<string>(hashToKey(location.hash))

  console.log({ active, target, hash: location.hash })

  //reacting to changing hash
  useEffect(() => {
    if (location.pathname !== '/') return
    if (!location.hash) {
      // handling #Home, and all hashes that aren`t in keys
      document.getElementById(keys[0]).scrollIntoView()
    } else {
      if (!keys.includes(location.hash.replace('#', ''))) {
        navigate('/', { replace: true })
      }
    }
    if (location.hash !== `#${active}`) {
      setTarget(hashToKey(location.hash))
    }
  }, [location.hash])

  useEffect(() => {
    if (active === target && active !== hashToKey(location.hash)) {
      navigate(keyToHash(active) || '/', { replace: true })
    }
  }, [active, target])

  useEffect(() => {
    if (active !== target) {
      document.querySelector(`#${target}`).scrollIntoView()
    }
  }, [target])

  // handling scrolling with keys
  const wrapperRef = useRef<HTMLElement>()
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      wrapperRef.current.scrollBy(0, 1000)
    }
    if (e.key === 'ArrowUp') {
      wrapperRef.current.scrollBy(0, -1000)
    }
  }

  useEffect(() => {
    if (isBrowser) window.addEventListener('keydown', handleKeyDown)
    return () => {
      if (isBrowser) window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <SectionActiveContext.Provider value={{ active, setActive, target, setTarget, hashToKey }}>
      <Wrapper ref={wrapperRef as any}>
        {Children.map(children, (child, i) => (
          <SnapScrollSection id={keys[i]}>{child}</SnapScrollSection>
        ))}
      </Wrapper>
      <MediaQuery query={`(min-width: ${breakpoints.MIN_TABLET}px)`}>
        <Navigator keys={keys} active={target} />
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
  /* scroll-behavior: smooth; */

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    scroll-snap-align: center;
  }
`
