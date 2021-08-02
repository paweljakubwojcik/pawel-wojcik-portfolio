import React from 'react'
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
  const match = isBrowser ? window.matchMedia(query) : null

  const [matches, setMatches] = useState(match?.matches)

  const handleChange = (t: MediaQueryListEvent) => setMatches(t.matches)
  useEffect(() => {
    match.addEventListener('change', handleChange)
    return () => match.removeEventListener('change', handleChange)
  })

  return matches ? <>{children}</> : null
}
