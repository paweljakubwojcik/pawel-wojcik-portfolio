import React, { useEffect, useState, useRef } from 'react'

export const useIntersectionObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit
) => {
  const [ref, setRef] = useState<HTMLElement>(null)
  const [root, setRoot] = useState<HTMLElement>(null)
  const [visible, setVisible] = useState<boolean>(false)

  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    if (ref) {
      observer.current = new IntersectionObserver(
        ([entry]) => {
          setVisible(entry.isIntersecting)
          if (callback && entry.isIntersecting) callback(entry)
        },
        {
          root,
          ...options,
        }
      )
      observer.current.observe(ref)
    }
    return () => {
      if (ref) observer.current.unobserve(ref)
    }
  }, [ref, visible, options, callback, root])

  return { setRef, visible, setRoot }
}
