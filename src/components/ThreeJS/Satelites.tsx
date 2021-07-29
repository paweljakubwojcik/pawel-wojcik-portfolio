import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { DoubleSide, MathUtils, Mesh, MeshStandardMaterial, PlaneBufferGeometry } from 'three'
import { useSceneContext } from './SceneContext'

// config
const MAX_TILT = 30,
  MIN_TILT = 20,
  ORBIT_RADIUS = 1.1,
  ORBIT_VELOCITY = 0.5,
  SPINNING_VEL_MIN = 3,
  SPINNING_VEL_MAX = 6

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

  const spinningVelocity = MathUtils.randFloat(SPINNING_VEL_MIN, SPINNING_VEL_MAX)
  const orbitVelocity = ORBIT_VELOCITY
  const orbitRadius = ORBIT_RADIUS
  const tilt = MathUtils.randFloat(MIN_TILT, MAX_TILT)
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
