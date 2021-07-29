import React from 'react'
import Canvas from './Canvas'
import Moon from './Moon'
import Group from './Group'
import Satelites from './Satelites'
import Ligths from './Ligths'

export default function Scene({ animation }) {
  return (
    <Canvas
      style={{
        position: 'absolute',
        zIndex: 0,
        left: 0,
      }}
      animation={animation}
    >
      <Ligths />
      <Group>
        <Moon />
        <Satelites />
      </Group>
    </Canvas>
  )
}
