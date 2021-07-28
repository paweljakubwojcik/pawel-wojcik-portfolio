import React from 'react'
import Canvas from './Canvas'
import Moon from './Moon'
import Group from './Group'

export default function Scene() {
  return (
    <Canvas>
      <Group>
        <Moon />
        {/*  <Satelites /> */}
      </Group>
    </Canvas>
  )
}
