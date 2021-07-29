import React from 'react'
import { useEffect } from 'react'
import { useTheme } from 'styled-components'
import { PointLight } from 'three'
import { useSceneContext } from './SceneContext'

export default function Ligths() {
  const { scene } = useSceneContext()
  const {
    colors: {
      palette: { green, pink },
    },
  } = useTheme()

  useEffect(() => {
    const whiteLight = new PointLight('#ffffff', 0.6)
    whiteLight.position.set(0, -1, 7)
    scene.add(whiteLight)

    const pinkLight = new PointLight(pink.main, 0.9)
    pinkLight.position.set(-2, -3, 10)
    scene.add(pinkLight)
  }, [])

  return null
}
