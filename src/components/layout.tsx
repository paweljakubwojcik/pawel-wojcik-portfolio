/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header'
import GlobalStyles from './GlobalStyles'
import ThemeProvider from '../context/theme'
import './resets.css'
import styled from 'styled-components'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider>
      <Container>
        <GlobalStyles />
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />

        <main>{children}</main>
        <Footer>
          © {new Date().getFullYear()}, Built with
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </Footer>
      </Container>
    </ThemeProvider>
  )
}

const Container = styled.div`
  margin: 0 2em;
`

const Footer = styled.footer`
  display: flex;
  z-index: 1;
  position: fixed;
  bottom: 0;
  font-size: small;
`

export default Layout
