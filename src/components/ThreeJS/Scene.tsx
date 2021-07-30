import React from 'react'
import Canvas from './Canvas'
import Moon from './Moon'
import Group from './Group'
import Satelites from './Satelites'
import Ligths from './Ligths'

export default function Scene({ animation, ...rest }) {
  return (
    <Canvas
      style={{
        position: 'absolute',
        zIndex: 0,
        left: 0,
      }}
      animation={animation}
      {...rest}
    >
      <Ligths />
      <Group>
        <Moon />
        <Satelites />
      </Group>
    </Canvas>
  )
}
