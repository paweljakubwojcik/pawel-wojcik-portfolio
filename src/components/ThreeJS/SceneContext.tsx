import React, { createContext } from 'react'
import { useContext } from 'react'
import { Clock, Group, Scene, TextureLoader } from 'three'

const SceneContext = createContext<{
  scene?: Scene | Group
  render?: () => void
  textureLoader?: TextureLoader
  clock?: Clock
}>({})
const SceneContextProvider = SceneContext.Provider
const useSceneContext = () => useContext(SceneContext)

export { useSceneContext, SceneContextProvider }
