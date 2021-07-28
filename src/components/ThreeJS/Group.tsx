import React, { useEffect, useRef } from 'react'
import { SceneContextProvider, useSceneContext } from './SceneContext'
import { Group as GroupType, Group as ThreeGroup } from 'three'

export default function Group({ children }) {
  const sceneContext = useSceneContext()
  const group = useRef<GroupType>(new ThreeGroup())

  useEffect(() => {
    ;(async () => {
      sceneContext.scene.add(group.current)
      group.current.position.set(1, 0, 0)

      let targetPosition = { x: 1, y: 0, z: 0 }

      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) * 0.0001
        const y = (e.clientY - window.innerHeight / 2) * 0.0001

        targetPosition = { x: 1 - x, y: 0 + y, z: 0 }
      })

      sceneContext.animateFrame(() => {
        // Update objects
        group.current.position.x += 0.05 * (targetPosition.x - group.current.position.x)
        group.current.position.z += 0.05 * (targetPosition.z - group.current.position.z)

        group.current.position.y += 0.05 * (targetPosition.y - group.current.position.y)
      })
    })()
  }, [])

  return <SceneContextProvider value={{ ...sceneContext, scene: group.current }}>{children}</SceneContextProvider>
}
