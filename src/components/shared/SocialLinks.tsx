import React from 'react'
import IconButton from './IconButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons'

export default function SocialLinks() {
  return (
    <>
      <IconButton as="a" href="https://github.com/paweljakubwojcik" target="_blank">
        <FontAwesomeIcon icon={faGithub} />
      </IconButton>
      <IconButton as="a" href="https://www.facebook.com/profile.php?id=10000388906932" target="_blank">
        <FontAwesomeIcon icon={faFacebook} />
      </IconButton>
    </>
  )
}
