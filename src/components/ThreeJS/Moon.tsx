import { graphql, useStaticQuery } from 'gatsby'
import { useRef } from 'react'
import { useEffect } from 'react'
import { Color, DoubleSide, Mesh, MeshStandardMaterial, SphereBufferGeometry } from 'three'
import { useSceneContext } from './SceneContext'

type MoonProps = {
  onLoad: () => void
}

export default function Moon({ onLoad }: MoonProps) {
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

  const moon = useRef<Mesh<SphereBufferGeometry, MeshStandardMaterial>>()

  useEffect(() => {
    ;(async () => {
      /* const geometry = new TorusKnotGeometry(0.6, 0.2, 128, 32) */
      const geometry = new SphereBufferGeometry(1, 128, 128)

      // texture loader is async, so it takes callback
      const moonTexture = await textureLoader.loadAsync(MOON_TEXTURE)

      const moonDisp = await textureLoader.loadAsync(DISPLAYCMENT_MAP)

      // Materials
      const material = new MeshStandardMaterial({
        color: new Color('#ffffff'),
        displacementMap: moonDisp,
        displacementScale: 0.2,
        map: moonTexture,
        side: DoubleSide,
        wireframe: true,
      })

      moon.current = new Mesh(geometry, material)
      scene.add(moon.current)

      onLoad()

      let targetScale = 0.02

      window.addEventListener('mousemove', (e) => {
        const x = e.clientX - window.innerWidth / 2
        const y = e.clientY - window.innerHeight / 2
        targetScale = x / window.innerWidth - y / window.innerHeight
      })

      animateFrame((clock) => {
        const elapsedTime = clock.getElapsedTime()

        // Update objects
        moon.current.rotation.y = 0.05 * elapsedTime

        moon.current.material.displacementScale += 0.05 * (targetScale - moon.current.material.displacementScale)
      })
    })()
  }, [scene])

  return null
}
