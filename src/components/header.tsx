import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons'
import HamburgerIcon from './hamburgerIcon'
import SideBarMenu from './sideBarMenu'
import { useRef } from 'react'

type HeaderProps = {
  siteTitle?: string
}

const Header: React.FC<HeaderProps> = ({ siteTitle = '' }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  return (
    <StyledHeader ref={headerRef}>
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

        <Links ref={linksRef}>
          <IconButton as="a" href="#">
            <FontAwesomeIcon icon={faGithub} />
          </IconButton>
          <IconButton as="a" href="#">
            <FontAwesomeIcon icon={faFacebook} />
          </IconButton>
          <IconButton onClick={() => setSideMenuOpen((v) => !v)}>
            <HamburgerIcon active={sideMenuOpen} />
          </IconButton>
        </Links>
      </FlexContainer>

      <SideBarMenu
        paddingTop={headerRef?.current?.clientHeight}
        open={sideMenuOpen}
        width={linksRef?.current?.clientWidth}
      />
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
  position: sticky;
  z-index: 1;
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.h1`
  font-size: 1em;
  padding: 2em 0;
  margin-right: auto;
`

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  min-width: 300px;
  max-width: 500px;

  color: white;
  font-size: 1.5em;

  & > * {
    margin-left: 1.5em;
  }
`

export default Header
