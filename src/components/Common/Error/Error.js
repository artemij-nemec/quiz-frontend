import React from 'react'
import MainPageLink from '../../ui/MainPageLink'
import './Error.css'

const Error = ({ message, showLink=true }) => {
  return (
    <div className='error-wrapper '>
      {message}
      {showLink && <MainPageLink />}
    </div>
  )
}

export default Error
