import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { PointLight, Scene, PerspectiveCamera, WebGLRenderer, Clock, TextureLoader, LoadingManager } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import * as dat from 'dat.gui'
import { useTheme } from 'styled-components'
import { SceneContextProvider } from './SceneContext'
import { useRef } from 'react'

const isBrowser = typeof window !== `undefined`
const fov = 50
const aspectRatio = isBrowser ? window.innerWidth / window.innerHeight : undefined
const near = 0.1
const far = 10e4

type CanvasProp = {
  animation?: boolean
  children: React.ReactNode
  [key: string]: any
}

export default function Canvas({ children, animation, ...props }: CanvasProp) {
  const [canvas, canvasRef] = useState<HTMLElement>()
  const scene = useMemo(() => (isBrowser ? new Scene() : null), [])
  const camera = useMemo(() => (isBrowser ? new PerspectiveCamera(fov, aspectRatio, near, far) : null), [])
  const renderer = useMemo(() => (isBrowser ? new WebGLRenderer({ alpha: true }) : null), [])
  const clock = useMemo(() => (isBrowser ? new Clock() : null), [])
  const textureLoader = useMemo(() => new TextureLoader(new LoadingManager(() => render())), [])

  const render = useCallback(() => {
    requestAnimationFrame(() => renderer.render(scene, camera))
  }, [scene, camera, renderer])

  const setCanvasSize = () => {
    camera.aspect = window?.innerWidth / window?.innerHeight
    renderer.setSize(window?.innerWidth, window?.innerHeight)
    camera.updateProjectionMatrix()
  }

  const resize = useCallback(() => {
    setCanvasSize()
    render()
  }, [camera, renderer, render])

  //on Mount
  useEffect(() => {
    if (isBrowser) {
      setCanvasSize()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [resize])

  useEffect(() => {
    if (canvas) {
      canvas.appendChild(renderer.domElement)
    }
  }, [canvas])

  /* animations  */
  const animationCallbacks = useRef<Array<(clock: Clock) => void>>([])
  const animateFrame = (callback: (clock: Clock) => void) => {
    animationCallbacks.current.push(callback)
  }

  const animationHandle = useRef<number>()

  useEffect(() => {
    const animate = () => {
      animationCallbacks.current.forEach((callback) => callback(clock))
      render()
      animationHandle.current = requestAnimationFrame(animate)
    }
    if (animation) {
      animate()
      console.log('starting animation')
    } else {
      console.log('stoping animation')
      cancelAnimationFrame(animationHandle.current)
    }
  }, [animationCallbacks, animation])

  useEffect(() => {
    console.log('creating view')

    camera.position.set(0, 0, 3)
    renderer.setSize(window?.innerWidth, window?.innerHeight)
  }, [])

  return (
    <SceneContextProvider value={{ scene, render, textureLoader, animateFrame }}>
      <div ref={canvasRef} {...props}>
        {children}
      </div>
    </SceneContextProvider>
  )
}
