import React from 'react'
import { NavLink } from 'react-router-dom'
import './MainPageLink.css'

const MainPageLink = () => {
  return (
    <div className='main-page-link'>
      <NavLink to='/'>Main page</NavLink>
    </div>
  )
}

export default MainPageLink
