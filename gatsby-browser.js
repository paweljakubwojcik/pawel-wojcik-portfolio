/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

const React = require('react')
const Layout = require('./src/components/Layout').default
const hideLoader = require('./src/components/Loader/hideLoader').default

exports.wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout {...props}>{element}</Layout>
}

exports.onClientEntry = () => {
  console.log('initial render')
  if (process.env.NODE_ENV === 'production') {
    window.addEventListener('load', hideLoader)
  }
}
