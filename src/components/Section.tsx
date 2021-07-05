import React from 'react'
import styled from 'styled-components'

export default function Section({ ...props }) {
  return <Container {...props}></Container>
}

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
