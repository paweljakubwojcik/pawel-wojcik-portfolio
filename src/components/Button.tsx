import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Button({ children, icon, ...props }) {
  return (
    <StyledButton {...props}>
      <FontAwesomeIcon icon={icon} style={{ fontSize: '1.5em', marginRight: '.2em' }} />
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: fit-content;

  background: linear-gradient(
    135deg,
    ${(props) => `${props.theme.colors.palette.pink.main}, ${props.theme.colors.palette.violet.light}`}
  );

  padding: 0.5em;
  border-radius: 0.1em;
  color: inherit;
`
