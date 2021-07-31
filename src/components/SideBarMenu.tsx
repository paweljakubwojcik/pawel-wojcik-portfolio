import React, { useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled, { useTheme } from 'styled-components'

import { AnimatePresence, motion, Variants } from 'framer-motion'
import useScreenSize from '../hooks/useScreenSize'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import SocialLinks from './SocialLinks'
import MediaQuery from './MediaQuery'

type sideBarMenuProps = {
  open?: boolean
  clickCoordinates: {
    x: number
    y: number
  }
  toggleOpen: (e?: MouseEvent) => void
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

const AnimationState: Variants = {
  open: ({ x, y, size }) => ({
    clipPath: `circle(${size}px at ${x}px ${y}px)`,
    transition: {
      staggerChildren: 0.1,
      duration: 0.7,
      delayChildren: 0.3,
    },
  }),
  closed: ({ x, y }) => ({
    clipPath: `circle(2px at ${x}px ${y}px)`,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
      delay: 0.3,
      staggerDirection: -1,
    },
  }),
}

const ListItemsAnimation: Variants = {
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  },
}

export default function SideBarMenu({
  open = true,
  toggleOpen,
  clickCoordinates: { x = 100, y = 100 },
}: sideBarMenuProps) {
  const { height, width } = useScreenSize()
  const { breakpoints } = useTheme()
  const location = useLocation()

  // closing menu when location changes
  useEffect(() => {
    if (open) setTimeout(toggleOpen, 300)
  }, [location])

  // hamburger button x coordinate is calculated from left side of the screen
  // if we skip this step, menu gonna resize properly but will not move clipPath origin point
  // also - this use of useMemo, technicaly, is illegal as useMemo should only be used for optimalization, but it takes less amount of code than useRef + useEffect
  const XFromLeft = useMemo(() => width - x, [x])

  return (
    <AnimatePresence>
      {open && (
        <MenuContainer
          custom={{ x: width - XFromLeft, y, size: Math.sqrt(width * width + height * height) }}
          variants={AnimationState}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <List>
            {options.map(({ name, link }) => (
              <Item key={name} variants={ListItemsAnimation}>
                <Link to={link} style={{ color: 'inherit' }}>
                  {name}
                </Link>
              </Item>
            ))}
            <MediaQuery query={`(max-width: ${breakpoints.MAX_MOBILE}px)`}>
              <Item variants={ListItemsAnimation}>
                <SocialLinks />
              </Item>
            </MediaQuery>
          </List>
        </MenuContainer>
      )}
    </AnimatePresence>
  )
}

const MenuContainer = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  z-index: -1;

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

const Item = styled(motion.li)`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 1em 0;
`
