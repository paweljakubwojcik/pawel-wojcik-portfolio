import React, { useEffect } from 'react'
import hideLoader from './hideLoader'
import './loader.css'
export default function Loader() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      hideLoader()
    }
  }, [])

  return (
    <div className={'___loader'} id={'___loader'}>
      <div className={'___loader--spinner'}>
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
      </div>
    </div>
  )
}
