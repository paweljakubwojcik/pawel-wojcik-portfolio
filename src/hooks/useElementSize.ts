import { useEffect, useRef, useState } from 'react'

type Size = {
  width?: string
  height?: string
}

export default function useElementSize(initialSize: Size): [size: Size, ref: React.MutableRefObject<HTMLElement>] {
  const refToElement = useRef<HTMLElement>()
  const [size, setElementSize] = useState(initialSize)

  useEffect(() => {
    if (refToElement.current)
      setElementSize({
        height: `${refToElement.current.clientHeight}px`,
        width: `${refToElement.current.clientWidth}px`,
      })
  }, [refToElement.current])

  const handleResize = () => {
    if (refToElement.current)
      setElementSize({
        height: `${refToElement.current.clientHeight}px`,
        width: `${refToElement.current.clientWidth}px`,
      })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return [size, refToElement]
}
