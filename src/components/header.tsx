import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons'
import HamburgerIcon from './hamburgerIcon'

type HeaderProps = {
  siteTitle?: string
}

const Header: React.FC<HeaderProps> = ({ siteTitle = '' }) => {
  const [sideMenu, setSideMenu] = useState(false)

  return (
    <StyledHeader>
      <FlexContainer>
        <Logo>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {'Pawel.Jakub.Wojcik'}
          </Link>
        </Logo>
        <Links>
          <IconButton as="a" href="#">
            <FontAwesomeIcon icon={faGithub} />
          </IconButton>
          <IconButton as="a" href="#">
            <FontAwesomeIcon icon={faFacebook} />
          </IconButton>
          <IconButton onClick={() => setSideMenu(true)}>
            <HamburgerIcon active={sideMenu} />
          </IconButton>
        </Links>
      </FlexContainer>
    </StyledHeader>
  )
}

const IconButton = styled.button`
  display: block;
  padding: 0.5em;
  background-color: transparent;
  color: inherit;
`

const StyledHeader = styled.header`
  background: transparent;
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.h1`
  font-size: 1em;
  padding: 2em 0;
`

const Links = styled.div`
  display: flex;
  color: white;
  font-size: 1.5em;

  & > * {
    margin-left: 1.5em;
  }
`

export default Header
