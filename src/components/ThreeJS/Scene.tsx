import React from 'react'
import Canvas from './Canvas'
import Moon from './Moon'
import Group from './Group'
import Satelites from './Satelites'

export default function Scene() {
  return (
    <Canvas
      style={{
        position: 'absolute',
        zIndex: 0,
        left: 0,
      }}
    >
      <Group>
        <Moon />
        <Satelites />
      </Group>
    </Canvas>
  )
}
