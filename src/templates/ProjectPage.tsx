import { graphql, Link } from 'gatsby'
import React from 'react'

export default function ProjectPage({ data: { project, otherPages } }) {
  console.log(otherPages)
  return (
    <>
      <div>{project.name}</div>
      {otherPages.nodes.map((node) => (
        <Link to={'/projects/' + node.name}> {node.name}</Link>
      ))}
    </>
  )
}

export const query = graphql`
  query SingleProject($name: String) {
    project: graphCmsProject(name: { eq: $name }) {
      description
      images {
        gatsbyImageData
      }
      link
      name
      repository
    }

    otherPages: allGraphCmsProject(filter: { name: { ne: $name } }) {
      nodes {
        name
        images {
          gatsbyImageData
        }
      }
    }
  }
`
