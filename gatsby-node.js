/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require(`path`)
const fs = require('fs')

const PROJECTS_PATH = '/projects/'

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  try {
    const {
      data: {
        allGraphCmsProject: { nodes: projects },
      },
    } = await graphql(`
      query Projects {
        allGraphCmsProject {
          nodes {
            name
          }
        }
      }
    `)

    const pageTemplate = path.resolve(`src/templates/ProjectPage.tsx`)

    projects.forEach(({ name }) => {
      createPage({
        path: `${PROJECTS_PATH}${name}`,
        component: pageTemplate,
        context: {
          name,
        },
      })
    })

    console.log(`created ${projects.length} pages`)
  } catch (e) {
    console.log(e)
  }
}
