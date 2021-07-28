import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

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

  useEffect(() => {
    match.onchange = (t) => setMatches(t.matches)
    return () => (match.onchange = null)
  })

  return matches && isBrowser && <>{children}</>
}
