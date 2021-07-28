import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import {
  Clock,
  Color,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  Scene,
  SphereBufferGeometry,
  SphereGeometry,
  TextureLoader,
} from 'three'
import { useSceneContext } from './SceneContext'

export default function Moon() {
  const {
    texture: { publicURL: MOON_TEXTURE },
    displaycment: { publicURL: DISPLAYCMENT_MAP },
  } = useStaticQuery(graphql`
    query Moon {
      texture: file(name: { eq: "moon_texture" }) {
        publicURL
      }
      displaycment: file(name: { eq: "moon_displaycment_map" }) {
        publicURL
      }
    }
  `)

  const { scene, render, clock, textureLoader } = useSceneContext()

  const moon = useRef<Mesh<SphereGeometry, MeshStandardMaterial>>()

  useEffect(() => {
    ;(async () => {
      const geometry = new SphereBufferGeometry(1, 128, 128)

      // texture loader is async, so it takes callback
      const moonTexture = await textureLoader.loadAsync(MOON_TEXTURE)

      const moonDisp = await textureLoader.loadAsync(DISPLAYCMENT_MAP)

      /* const clipPlanes = [new Plane(new Vector3(0, up ? -1 : 1, 0), -0.01)] */

      // Materials
      const material = new MeshStandardMaterial({
        color: new Color('#ffffff'),
        displacementMap: moonDisp,
        displacementScale: 0.02,
        map: moonTexture,
        /*  clippingPlanes: clipPlanes,
      clipIntersection: true, */
        side: DoubleSide,
      })

      moon.current = new Mesh(geometry, material)
      scene.add(moon.current)

      let targetPosition = { x: 0, y: 0, z: 0 }

      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) * 0.0001
        const y = (e.clientY - window.innerHeight / 2) * 0.0001

        targetPosition = { x: 0 + x, y: 0 - y, z: 0 }
      })

      const tick = () => {
        const elapsedTime = clock.getElapsedTime()

        // Update objects
        moon.current.rotation.y = 0.05 * elapsedTime

        // Render
        render()

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
      }
      tick()
    })()
  }, [scene])

  return null
}
