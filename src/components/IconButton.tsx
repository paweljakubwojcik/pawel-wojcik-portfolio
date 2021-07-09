import styled from 'styled-components'

const IconButton = styled.button`
  display: block;
  padding: 0.5em;
  background-color: transparent;
  color: inherit;

  &:hover {
    color: ${(props) => props.theme.colors.palette.pink.light};
  }
  transition: color 0.4s;
`

export default IconButton
