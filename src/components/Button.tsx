import React from 'react'
import styled, { DefaultTheme, StyledComponentProps } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

type ButtonProps = {
  icon?: IconProp
  children: React.ReactNode
} & StyledComponentProps<any, DefaultTheme, {}, never>

export default function Button({ children, icon, ...props }: ButtonProps) {
  return (
    <StyledButton {...props}>
      {icon && <FontAwesomeIcon icon={icon} style={{ fontSize: '1.5em', marginRight: '.2em' }} />}
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

  &:hover {
    filter: brightness(1.1);
  }
  transition: filter 0.4s;
`
