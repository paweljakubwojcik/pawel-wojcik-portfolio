import * as React from 'react'

import Seo from '../components/Seo'
import styled from 'styled-components'

const NotFoundPage = () => (
  <FlexWrapper>
    <Seo title="404: Not found" />
    <h1>404: Not Found</h1>
  </FlexWrapper>
)

export default NotFoundPage

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
`
