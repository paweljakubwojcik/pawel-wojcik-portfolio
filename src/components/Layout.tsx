/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useLocation } from '@reach/router'
import Header from './Header'
import GlobalStyles from './GlobalStyles'
import ThemeProvider from '../context/theme'
import './resets.css'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

type LayoutProps = {
  children: React.ReactNode
}

const ContainerVariants = {
  exit: {
    opacity: 0,
    transition: { when: 'afterChildren', delay: 0.5 },
  },
  animate: {
    opacity: 1,
    transition: { when: 'beforeChildren' },
  },
  initial: {
    opacity: 0,
  },
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

  const location = useLocation()

  return (
    <ThemeProvider>
      <Container>
        <GlobalStyles />
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.main
            key={location?.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={ContainerVariants}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer>
          © {new Date().getFullYear()}, Built with
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </Footer>
      </Container>
    </ThemeProvider>
  )
}

const Container = styled(motion.div)`
  margin: 0 var(--content-global-padding);
`

const Footer = styled.footer`
  display: flex;
  z-index: 1;
  position: fixed;
  bottom: 0;
  font-size: small;
`

export default Layout
