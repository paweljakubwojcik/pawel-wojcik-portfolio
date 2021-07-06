import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

type MediaQueryProps = {
  children: React.ReactNode
  query: string
}

/**
 * Component that renders children only if media-query is true
 */
export default function MediaQuery({ children, query }: MediaQueryProps) {
  const match = window.matchMedia(query)

  const [matches, setMatches] = useState(match.matches)

  useEffect(() => {
    match.onchange = (t) => setMatches(t.matches)
    return () => (match.onchange = null)
  })

  return matches && <>{children}</>
}
