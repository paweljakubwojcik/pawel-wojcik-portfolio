/// <reference path="./styled-components.d.ts" />
// dummy file to make declaration merging work

import { MotionValue } from 'framer-motion'
import { IGatsbyImageData } from 'gatsby-plugin-image'

export enum navigateDirections {
  PROJECTS,
  SINGLE_PROJECT,
  UNKNOWN,
}

export type ProjectType = {
  name: string
  description: string
  brief: string
  link: string
  repository: string
  images: {
    id: string
    url: string
    gatsbyImageData: IGatsbyImageData
  }[]
  skills: {
    name: string
    icon: {
      url: string
    }
  }[]
}

export type StandardLocationState = {
  prevLocation: string
}

export type PropsFromSnapscrollSection = {
  id: string
  visible?: boolean
  wholeView?: boolean
  motionValue?: MotionValue
}
