import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const isBrowser = typeof window !== 'undefined'

export default function MouseFollower() {
  const followerRef = useRef<HTMLDivElement>()

  const handleMove = (e: MouseEvent) => {
    const { x, y } = e
    followerRef.current.style.transform = `translate(${x}px, ${y}px)`
  }

  useEffect(() => {
    if (isBrowser) {
      window.addEventListener('mousemove', handleMove)
    }
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return <Follower ref={followerRef}></Follower>
}

const Follower = styled.div`
  position: fixed;
  top: -15px;
  left: -15px;
  z-index: 0;

  pointer-events: none;

  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.palette.pink.dark};

  opacity: 0.4;

  transform: translate(-100%, -100%);
  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`
