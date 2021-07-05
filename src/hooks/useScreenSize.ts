import { useEffect, useState } from 'react'

export default function useScreenSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  const updateSizes = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', updateSizes)

    return () => {
      window.removeEventListener('resize', updateSizes)
    }
  }, [])

  return size
}
