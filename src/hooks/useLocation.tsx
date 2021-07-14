import { useEffect } from 'react'
import { useState } from 'react'

const isBrowser = typeof window !== 'undefined'

export default function useLocation() {
  return isBrowser ? location : null
}
