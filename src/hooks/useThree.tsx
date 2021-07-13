import React, { useMemo, useCallback, useState, useEffect } from 'react'
import { Scene, PerspectiveCamera, WebGLRenderer, Clock, TextureLoader } from 'three'

const isBrowser = typeof window !== `undefined`

const fov = 50
const aspectRatio = isBrowser ? window.innerWidth / window.innerHeight : undefined
const near = 0.1
const far = 10e4

export default function useThree() {
  const scene = useMemo(() => (isBrowser ? new Scene() : null), [])
  const camera = useMemo(() => (isBrowser ? new PerspectiveCamera(fov, aspectRatio, near, far) : null), [])
  const renderer = useMemo(() => (isBrowser ? new WebGLRenderer({ alpha: true }) : null), [])
  const clock = useMemo(() => (isBrowser ? new Clock() : null), [])
  const textureLoader = useMemo(() => new TextureLoader(), [])

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

  const [canvas, canvasRef] = useState<HTMLElement>()

  useEffect(() => {
    if (canvas) {
      canvas.appendChild(renderer.domElement)
    }
  }, [canvas])

  return { scene, camera, renderer, render, canvas, canvasRef, clock, textureLoader }
}
