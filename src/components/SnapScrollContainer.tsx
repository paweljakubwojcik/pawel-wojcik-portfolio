import React from 'react'
import styled from 'styled-components'

export default function SnapScrollContainer({ children }) {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  overflow: scroll;
  scroll-snap-type: y mandatory;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    scroll-snap-align: center;
  }
`
