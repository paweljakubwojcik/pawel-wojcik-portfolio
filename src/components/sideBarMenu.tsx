import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'

type sideBarMenuProps = {
  open?: boolean
  paddingTop: number
  width: number
}

const options = [
  {
    name: 'Home',
    icon: null,
  },
  {
    name: 'Projects',
    icon: null,
  },
  {
    name: 'About',
    icon: null,
  },
  {
    name: 'Contact',
    icon: null,
  },
]

const MenuStates = {
  open: {
    opacity: [1, 1],
    clipPath: 'circle(700px at 260px 0px)',
  },
  closed: {
    clipPath: 'circle(30px at 260px 0px)',
    opacity: [1, 0],
  },
}

export default function sideBarMenu({
  open = true,
  paddingTop = 100,
  width = 300,
}: sideBarMenuProps) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <MenuContainer
          style={{ paddingTop, width }}
          initial={{
            opacity: 0,
          }}
          animate={MenuStates.open}
          exit={MenuStates.closed}
          transition={{
            duration: 0.5,
          }}
        >
          <List>
            {options.map(({ name }) => (
              <Item>{name}</Item>
            ))}
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

  width: 50%;
  min-width: 350px;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.palette.violet.main};
  color: ${(props) => props.theme.colors.font.main};

  font-size: 1.5em;
  font-weight: 600;
`

const List = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 1em;
  margin: 0;
`

const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 1em 0;
`
