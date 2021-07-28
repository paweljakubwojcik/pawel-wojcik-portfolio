import { graphql, useStaticQuery } from 'gatsby'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Mesh,
  SphereBufferGeometry,
  Color,
  MeshStandardMaterial,
  PointLight,
  Plane,
  Scene,
  Vector3,
  Group,
  DoubleSide,
  PerspectiveCamera,
  WebGLRenderer,
  Clock,
  TextureLoader,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import useThree from '../../hooks/useThree'
import * as dat from 'dat.gui'
import { useTheme } from 'styled-components'
import IconSatelite from './IconSatelite'
import { SceneContextProvider } from './SceneContext'

// TODO: Split up threejs elements into canvas, light, moons and other stuff
// TODO: refactor this ^^^^
const isBrowser = typeof window !== `undefined`
const fov = 50
const aspectRatio = isBrowser ? window.innerWidth / window.innerHeight : undefined
const near = 0.1
const far = 10e4

export default function Canvas({ children, ...props }: { children: React.ReactNode }) {
  /*   const {
    texture: { publicURL: MOON_TEXTURE },
    displaycment: { publicURL: DISPLAYCMENT_MAP },
    skills: { nodes: icons },
  } = useStaticQuery(graphql`
    query Moon {
      texture: file(name: { eq: "moon_texture" }) {
        publicURL
      }
      displaycment: file(name: { eq: "moon_displaycment_map" }) {
        publicURL
      }
      skills: allGraphCmsSkill {
        nodes {
          icon {
            url
          }
        }
      }
    }
  `) */

  const {
    colors: {
      palette: { green, pink },
    },
  } = useTheme()

  const [canvas, canvasRef] = useState<HTMLElement>()
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

  useEffect(() => {
    if (canvas) {
      canvas.appendChild(renderer.domElement)
    }
  }, [canvas])

  useEffect(() => {
    if (canvas) {
      console.log('creating view')

      camera.position.set(0, 0, 3)
      renderer.setSize(window?.innerWidth, window?.innerHeight)

      const pointLight = new PointLight('#ffffff', 0.6)
      pointLight.position.set(0, -1, 7)
      scene.add(pointLight)

      const pinkLight = new PointLight(pink.main, 0.9)
      pinkLight.position.set(-2, -3, 10)
      pinkLight.castShadow = true
      scene.add(pinkLight)

      pinkLight.shadow.mapSize.width = 512 // default
      pinkLight.shadow.mapSize.height = 512 // default
      pinkLight.shadow.camera.near = 0.5 // default
      pinkLight.shadow.camera.far = 500 // default

      /* const group = new Group()
      const moon = createMoon()
      group.add(moon)
      //group.add(moon2)
      const iconsSatelites: IconSatelite[] = icons.map((icon) => new IconSatelite(icon.icon.url, {}))
      iconsSatelites.forEach((iconSatelite) => group.add(iconSatelite.mesh))

      group.position.set(1, 0, 0)
      scene.add(group)
      camera.updateProjectionMatrix()

      let targetPosition = { x: 0, y: 0, z: 0 }

      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) * 0.0001
        const y = (e.clientY - window.innerHeight / 2) * 0.0001

        targetPosition = { x: 0 + x, y: 0 - y, z: 0 }
      })

      const tick = () => {
        const elapsedTime = clock.getElapsedTime()

        // Update objects
        moon.rotation.y = 0.05 * elapsedTime
        iconsSatelites.forEach((iconSatelite) => iconSatelite.updatePosition(elapsedTime))

        moon.position.x += 0.05 * (targetPosition.x - moon.position.x)
        moon.position.z += 0.05 * (targetPosition.z - moon.position.z)

        group.position.y += 0.05 * (targetPosition.y - group.position.y)

        // Render
        render()

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
      }
      tick() */
    }
  }, [canvas, camera, renderer, render, scene])

  return (
    <SceneContextProvider value={{ scene, render, clock, textureLoader }}>
      <div
        ref={canvasRef}
        style={{
          position: 'absolute',
          zIndex: 0,
          left: 0,
        }}
        {...props}
      >
        {children}
      </div>
    </SceneContextProvider>
  )
}
