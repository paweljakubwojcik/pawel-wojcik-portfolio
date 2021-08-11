import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { Color, DoubleSide, Mesh, MeshStandardMaterial, SphereBufferGeometry, SphereGeometry } from 'three'
import { useSceneContext } from './SceneContext'

export default function Moon({ onLoad }: { onLoad: () => void }) {
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

  const { scene, animateFrame, textureLoader } = useSceneContext()

  const moon = useRef<Mesh<SphereGeometry, MeshStandardMaterial>>()

  useEffect(() => {
    ;(async () => {
      const geometry = new SphereBufferGeometry(1, 128, 128)

      // texture loader is async, so it takes callback
      const moonTexture = await textureLoader.loadAsync(MOON_TEXTURE)

      const moonDisp = await textureLoader.loadAsync(DISPLAYCMENT_MAP)

      // Materials
      const material = new MeshStandardMaterial({
        color: new Color('#ffffff'),
        displacementMap: moonDisp,
        displacementScale: 0.02,
        map: moonTexture,
        side: DoubleSide,
      })

      moon.current = new Mesh(geometry, material)
      scene.add(moon.current)

      onLoad()

      animateFrame((clock) => {
        const elapsedTime = clock.getElapsedTime()

        // Update objects
        moon.current.rotation.y = 0.05 * elapsedTime
      })
    })()
  }, [scene])

  return null
}
