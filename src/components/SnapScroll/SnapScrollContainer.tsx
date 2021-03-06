import React, { Children, useCallback, useRef } from 'react'
import { createContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import MediaQuery from '../MediaQuery'
import Navigator from '../Navigator'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import SnapScrollSection from './SnapScrollSection'
import useScreenSize from '../../hooks/useScreenSize'
import { useElementScroll } from 'framer-motion'

type SnapScrollContainerProps = {
  children: React.ReactNode
}

const isBrowser = typeof window !== 'undefined'

export const SectionActiveContext = createContext<{
  active: string
  setActive: React.Dispatch<React.SetStateAction<string>>
  hashToKey: (hash: string) => string
  keyToHash: (key: string) => string
}>({
  active: '',
  setActive: () => {},
  hashToKey: (string) => string,
  keyToHash: (string) => string,
})

export default function SnapScrollContainer({ children }: SnapScrollContainerProps) {
  const location = useLocation()
  const { breakpoints } = useTheme()
  const { height: screenHeight } = useScreenSize()

  const wrapperRef = useRef<HTMLElement>()

  const { scrollYProgress } = useElementScroll(wrapperRef)

  const keys = (children as Array<JSX.Element>).map(({ props }) => props.id)

  // helper functions that transform hash into active id ( hash is ex. '#hashId', equivalent ctive id is 'hashId')
  // exeption is first key, that has empty string as corresponding hash
  const hashToKey = useCallback((hash: string) => (hash ? hash.replace('#', '') : keys[0]), [keys])
  const keyToHash = useCallback((key: string) => (key === keys[0] ? '' : `#${key}`), [keys])

  const [active, setActive] = useState<string>(keys[0])

  //reacting to changing hash
  useEffect(() => {
    if (location.pathname !== '/') return

    // when target hash doesn't exist on page
    if (!keys.includes(hashToKey(location.hash))) {
      navigate('/', { replace: true })
      return
    }
    document.getElementById(hashToKey(location.hash)).scrollIntoView()
  }, [location.hash])

  useEffect(() => {
    wrapperRef.current.style.scrollBehavior = 'auto'
    document.getElementById(hashToKey(location.hash)).scrollIntoView()
    wrapperRef.current.style.scrollBehavior = 'smooth'
  }, [])

  // replacing default scroll by wheel event to preserve consistant experience across browsers
  const handleWheel = (e: WheelEvent) => {
    const { deltaY, ctrlKey } = e
    if (ctrlKey) return

    e.preventDefault()
    if (deltaY > 0) {
      wrapperRef.current.scrollBy(0, screenHeight)
    }
    if (deltaY < 0) {
      wrapperRef.current.scrollBy(0, -screenHeight)
    }
  }
  useEffect(() => {
    wrapperRef.current.addEventListener('wheel', handleWheel)

    return () => {
      wrapperRef.current?.removeEventListener('wheel', handleWheel)
    }
  }, [])

  // handling scrolling with keys
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      wrapperRef.current.scrollBy(0, screenHeight)
    }
    if (e.key === 'ArrowUp') {
      wrapperRef.current.scrollBy(0, -screenHeight)
    }
  }
  useEffect(() => {
    if (isBrowser) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      if (isBrowser) {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [])

  const changeHash = (id: string) => {
    if (keyToHash(active) === location.hash && hashToKey(location.hash) !== id) {
      navigate(keyToHash(id) || '/', { replace: true })
    }
  }

  return (
    <SectionActiveContext.Provider value={{ active, setActive, hashToKey, keyToHash }}>
      <Wrapper ref={wrapperRef as any}>
        {Children.map(children, (child, i) => (
          <SnapScrollSection
            id={keys[i]}
            scrollYProgress={scrollYProgress}
            index={i}
            numberOfSiblings={keys.length}
            onScrollEnd={() => changeHash(keys[i])}
          >
            {child}
          </SnapScrollSection>
        ))}
      </Wrapper>
      <MediaQuery query={`(min-width: ${breakpoints.MIN_TABLET}px)`}>
        <Navigator keys={keys} progress={scrollYProgress} />
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
