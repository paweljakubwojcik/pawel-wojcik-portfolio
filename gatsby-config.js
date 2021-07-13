require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Paweł Wójcik's portfolio site`,
    description: `My name is Pawel, and I'm a web developer. See my work and feel free to hit me if you need help with your project`,
    author: `pawel.jakub.wojcik@gmail.com`,
    siteUrl: `https://localhost:8000/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/resources/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        token: process.env.GRAPHCMS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
