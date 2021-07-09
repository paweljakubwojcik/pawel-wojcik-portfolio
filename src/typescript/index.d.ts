import { IGatsbyImageData } from 'gatsby-plugin-image'

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
