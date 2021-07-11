import React, { useMemo, useCallback, useState, useEffect } from 'react'
import { Scene, PerspectiveCamera, WebGLRenderer, Clock, TextureLoader } from 'three'

const fov = 50
const aspectRatio = typeof window !== `undefined` ? window.innerWidth / window.innerHeight : undefined
const near = 0.1
const far = 10e4

export default function useThree() {
  const scene = useMemo(() => (typeof window !== `undefined` ? new Scene() : null), [])
  const camera = useMemo(
    () => (typeof window !== `undefined` ? new PerspectiveCamera(fov, aspectRatio, near, far) : null),
    []
  )
  const renderer = useMemo(() => (typeof window !== `undefined` ? new WebGLRenderer({ alpha: true }) : null), [])
  const clock = useMemo(() => (typeof window !== `undefined` ? new Clock() : null), [])
  const textureLoader = useMemo(() => new TextureLoader(), [])

  const render = useCallback(() => {
    requestAnimationFrame(() => renderer.render(scene, camera))
  }, [scene, camera, renderer])

  const resize = useCallback(() => {
    camera.aspect = window?.innerWidth / window?.innerHeight
    renderer.setSize(window?.innerWidth, window?.innerHeight)
    camera.updateProjectionMatrix()
    render()
  }, [camera, renderer, render])

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
