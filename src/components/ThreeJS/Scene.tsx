import React, { useState } from 'react'
import Canvas from './Canvas'
import Moon from './Moon'
import Group from './Group'
import Satelites from './Satelites'
import Ligths from './Ligths'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export default function Scene({ animation, motionValue, ...rest }) {
  const [loaded, setLoaded] = useState(false)
  const cameraPositionX = useTransform(motionValue, [0, 1], [1, 0])
  const cameraPositionZ = useTransform(motionValue, [0, 1], [0.9, 3])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      style={{
        position: 'fixed',
        left: 0,
        height: 'fit-content',
      }}
    >
      <Canvas
        style={{
          zIndex: -1,
          left: 0,
        }}
        animation={true}
        cameraPosition={{ x: cameraPositionX, z: cameraPositionZ }}
        {...rest}
      >
        <Ligths />
        <Group>
          <Moon onLoad={() => setLoaded(true)} />
          <Satelites />
        </Group>
      </Canvas>
    </motion.div>
  )
}
