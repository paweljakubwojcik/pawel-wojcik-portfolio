import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

type MediaQueryProps = {
  children: React.ReactNode
  query: string
}

const isBrowser = typeof window !== 'undefined'

/**
 * Component that renders children only if media-query is true
 */
export default function MediaQuery({ children, query }: MediaQueryProps) {
  const match = useRef(isBrowser ? window.matchMedia(query) : null)

  const [matches, setMatches] = useState<boolean>()

  const handleChange = (t: MediaQueryListEvent) => setMatches(t.matches)

  useEffect(() => {
    //setting set matches after the mount to properly hydrate server side rendered content
    setMatches(match.current?.matches)

    match.current.addEventListener('change', handleChange)
    return () => match.current.removeEventListener('change', handleChange)
  }, [])

  return matches ? <>{children}</> : null
}
