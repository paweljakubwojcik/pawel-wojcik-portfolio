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
import ThemeProvider, { theme } from '../context/theme'
import './resets.css'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import MouseFollower from './MouseFollower'
import MediaQuery from './MediaQuery'
import Loader from './Loader'

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

  const location = useLocation()

  return (
    <ThemeProvider>
      <VariablesConverter>
        <Loader />
      </VariablesConverter>

      <MediaQuery query={`(min-width: ${theme.breakpoints.MIN_LAPTOP}px)`}>
        <MouseFollower />
      </MediaQuery>
      <Wrapper>
        <Container>
          <GlobalStyles />
          <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
          <AnimatePresence exitBeforeEnter initial={false}>
            <motion.main key={location?.pathname} initial="initial" animate="animate" exit="exit">
              {children}
            </motion.main>
          </AnimatePresence>
        </Container>
      </Wrapper>
    </ThemeProvider>
  )
}

const Container = styled(motion.div)`
  margin: 0 var(--content-global-padding);
`

const Wrapper = styled.div`
  max-width: 2000px;
  margin: auto;
  position: relative;
`

const VariablesConverter = styled.div`
  --dark-violet: ${(props) => props.theme.colors.palette.violet.dark};
  --light-violet: ${(props) => props.theme.colors.palette.violet.light};
  --light-pink: ${(props) => props.theme.colors.palette.pink.light};
  --dark-pink: ${(props) => props.theme.colors.palette.pink.dark};
`

export default Layout
