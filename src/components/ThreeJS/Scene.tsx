import React, { useState } from 'react'
import Canvas from './Canvas'
import Moon from './Moon'
import Group from './Group'
import Satelites from './Satelites'
import Ligths from './Ligths'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export default function Scene({ animation, ...rest }) {
  const motionValue = useSpring(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    motionValue.set(loaded ? 1 : 0)
  }, [loaded])

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 0,
        height: 'fit-content',
        opacity: motionValue,
      }}
    >
      <Canvas
        style={{
          zIndex: 0,
          left: 0,
        }}
        animation={animation}
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
