import { useEffect, useRef, useState } from 'react'

type Size = {
  width?: string
  height?: string
  rect?: DOMRect
}

const getStringifiedProperties = (element: HTMLElement) => ({
  height: `${element.clientHeight}px`,
  width: `${element.clientWidth}px`,
  rect: element.getBoundingClientRect(),
})

export default function useElementSize(initialSize: Size): [size: Size, ref: React.MutableRefObject<HTMLElement>] {
  const refToElement = useRef<HTMLElement>()
  const [size, setElementSize] = useState(initialSize)

  useEffect(() => {
    if (refToElement.current) setElementSize(getStringifiedProperties(refToElement.current))
  }, [refToElement.current])

  const handleResize = () => {
    if (refToElement.current) setElementSize(getStringifiedProperties(refToElement.current))
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return [size, refToElement]
}
