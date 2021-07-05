import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons'
import HamburgerIcon from './HamburgerIcon'
import SideBarMenu from './SideBarMenu'
import { useRef } from 'react'

type HeaderProps = {
  siteTitle?: string
}

const Header: React.FC<HeaderProps> = ({ siteTitle = '' }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false)
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 })

  const toggleSideMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.currentTarget.blur()
    const { clientX, clientY } = e
    setClickCoordinates({ x: clientX ? clientX : window.innerWidth, y: clientY })
    setSideMenuOpen((v) => !v)
  }

  const headerRef = useRef<HTMLElement>(null)

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

        <Links>
          <IconButton as="a" href="#">
            <FontAwesomeIcon icon={faGithub} />
          </IconButton>
          <IconButton as="a" href="#">
            <FontAwesomeIcon icon={faFacebook} />
          </IconButton>
          <IconButton onClick={toggleSideMenu}>
            <HamburgerIcon active={sideMenuOpen} />
          </IconButton>
        </Links>
      </FlexContainer>

      <SideBarMenu
        paddingTop={headerRef?.current?.clientHeight}
        open={sideMenuOpen}
        clickCoordinates={clickCoordinates}
        toggleOpen={toggleSideMenu}
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
  top: 0;
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.h1`
  font-size: 1em;
  padding: 2em 0;
  margin-right: auto;

  color: ${(props) => props.theme.colors.font.main};
`

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  max-width: 500px;
  margin-left: 1em;

  color: ${(props) => props.theme.colors.font.main};
  font-size: 1.5em;

  @media (max-width: ${(props) => props.theme.breakpoints.MAX_TABLET}px) {
  }
`

export default Header
