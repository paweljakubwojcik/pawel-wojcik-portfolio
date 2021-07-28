import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { DoubleSide, MathUtils, Mesh, MeshStandardMaterial, PlaneBufferGeometry } from 'three'
import { useSceneContext } from './SceneContext'

export default function Satelites() {
  const {
    skills: { nodes: icons },
  } = useStaticQuery(graphql`
    query skills {
      skills: allGraphCmsSkill {
        nodes {
          icon {
            url
          }
        }
      }
    }
  `)

  return icons.map((icon, i) => <Satelite texture={icon.icon.url} key={i} />)
}

function Satelite({ texture }) {
  const { scene, animateFrame, textureLoader } = useSceneContext()

  const icon = useRef<Mesh<PlaneBufferGeometry, MeshStandardMaterial>>()

  const spinningVelocity = MathUtils.randFloat(3, 6)
  const orbitVelocity = 0.5
  const orbitRadius = 1.1
  const tilt = MathUtils.randFloat(20, 30)
  const margin = MathUtils.randFloat(0, MathUtils.degToRad(360))

  useEffect(() => {
    ;(async () => {
      const geometry = new PlaneBufferGeometry(0.1, 0.1)
      const iconTexture = await textureLoader.loadAsync(texture)
      const material = new MeshStandardMaterial({
        map: iconTexture,
        transparent: true,
        side: DoubleSide,
      })

      icon.current = new Mesh(geometry, material)
      scene.add(icon.current)

      animateFrame((clock) => {
        const elapsedTime = clock.getElapsedTime()

        icon.current.rotation.y = spinningVelocity * elapsedTime
        icon.current.position.setFromSphericalCoords(
          orbitRadius,
          MathUtils.degToRad(90) - Math.cos(orbitVelocity * elapsedTime + margin) * MathUtils.degToRad(tilt),
          orbitVelocity * elapsedTime + margin
        )
      })
    })()
  }, [scene])

  return null
}
