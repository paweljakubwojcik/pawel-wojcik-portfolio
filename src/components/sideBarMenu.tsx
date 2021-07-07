import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'
import styled, { useTheme } from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'
import useScreenSize from '../hooks/useScreenSize'
import { Link } from 'gatsby'
import SocialLinks from './shared/SocialLinks'
import MediaQuery from './MediaQuery'

type sideBarMenuProps = {
  open?: boolean
  paddingTop: number
  clickCoordinates: {
    x: number
    y: number
  }
  toggleOpen: React.MouseEventHandler<HTMLElement>
}

const options = [
  {
    name: 'Home',
    icon: null,
    link: '/',
  },
  {
    name: 'Projects',
    icon: null,
    link: '/#Projects',
  },
  {
    name: 'About',
    icon: null,
    link: '/#About',
  },
  {
    name: 'Contact',
    icon: null,
    link: '/#Contact',
  },
]

// FIXME: when animating clipPath, component is using clickcoordinates from previous click

export default function SideBarMenu({
  open = true,
  paddingTop = 100,
  toggleOpen,
  clickCoordinates: { x = 100, y = 100 },
}: sideBarMenuProps) {
  const { height, width } = useScreenSize()
  const { breakpoints } = useTheme()

  // hamburger button x coordinate is calculated from left side of the screen
  // if we skip this step, menu gonna resize properly but will not move clipPath origin point
  const XFromLeft = useMemo(() => width - x, [x])

  const MenuStates = {
    open: {
      clipPath: `circle(${Math.sqrt(width * width + height * height)}px at ${width - XFromLeft}px ${y}px)`,
    },
    closed: {
      clipPath: `circle(2px at ${width - XFromLeft}px ${y}px)`,
    },
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <MenuContainer
          initial={MenuStates.closed}
          animate={MenuStates.open}
          exit={MenuStates.closed}
          transition={{
            duration: 0.7,
          }}
        >
          <List>
            {options.map(({ name, link }) => (
              <Item key={name}>
                <Link to={link} state={{ viaLink: true }} style={{ color: 'inherit' }} onClick={toggleOpen}>
                  {name}
                </Link>
              </Item>
            ))}
            <MediaQuery query={`(max-width: ${breakpoints.MAX_MOBILE}px)`}>
              <Item>
                <SocialLinks />
              </Item>
            </MediaQuery>
          </List>
        </MenuContainer>
      )}
    </AnimatePresence>,
    document.querySelector('body')
  )
}

const MenuContainer = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 0;

  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.palette.violet.main};
  color: ${(props) => props.theme.colors.font.main};

  font-size: 2em;
  font-weight: 600;

  box-shadow: ${(props) => props.theme.shadows.medium};
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding: 1em;
  padding-bottom: 1.5em;
  margin: 0;
`

const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 1em 0;
`
