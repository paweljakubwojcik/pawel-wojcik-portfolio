import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled, { useTheme } from 'styled-components'

import HamburgerIcon from './HamburgerIcon'
import SideBarMenu from './SideBarMenu'
import MediaQuery from './MediaQuery'
import IconButton from './IconButton'
import { useRef } from 'react'
import SocialLinks from './SocialLinks'
import useScreenSize from '../hooks/useScreenSize'

type HeaderProps = {
  siteTitle?: string
}

const Header: React.FC<HeaderProps> = ({ siteTitle = '' }) => {
  const {
    breakpoints: { MIN_TABLET },
  } = useTheme()
  const [sideMenuOpen, setSideMenuOpen] = useState(false)
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 })
  const { width } = useScreenSize()

  const toggleSideMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.currentTarget.blur()
    const { clientX, clientY } = e
    // when not using the mouse or touchscreen clientX is 0  (left side), it is better to have it open from right top corner
    const x = clientX ? clientX : width
    const y = clientY
    setClickCoordinates({ x, y })
    setSideMenuOpen((v) => !v)
  }

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
          <MediaQuery query={`(min-width:${MIN_TABLET}px)`}>
            <SocialLinks />
          </MediaQuery>
          <IconButton onClick={toggleSideMenu}>
            <HamburgerIcon active={sideMenuOpen} />
          </IconButton>
        </Links>
      </FlexContainer>

      <SideBarMenu
        open={sideMenuOpen}
        clickCoordinates={clickCoordinates}
        toggleOpen={() => setSideMenuOpen((v) => !v)}
      />
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  background: transparent;
  position: relative;
  z-index: 2;
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
  flex-direction: row;
  justify-content: right;
  flex-grow: 1;
  max-width: 500px;
  margin-left: 1em;

  color: ${(props) => props.theme.colors.font.main};
  font-size: 1.5em;

  & > * {
    margin-left: auto;
  }
`

export default Header
