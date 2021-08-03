import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const isBrowser = typeof window !== 'undefined'

export default function PageScrollWrapper({ children, ...props }) {
  const wrapperRef = useRef<HTMLDivElement>()

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      wrapperRef.current.scrollBy(0, 100)
    }
    if (e.key === 'ArrowUp') {
      wrapperRef.current.scrollBy(0, -100)
    }
  }
  useEffect(() => {
    if (isBrowser) window.addEventListener('keydown', handleKeyDown)
    return () => {
      if (isBrowser) window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <PageWrapper ref={wrapperRef} {...props}>
      {children}
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100vh;
  padding-top: 100px;

  scroll-behavior: smooth;

  overflow-y: auto;
  overflow-x: hidden;
`
