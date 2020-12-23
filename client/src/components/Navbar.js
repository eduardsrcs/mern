import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
      <div class="nav-wrapper">
        <a href="/" class="brand-logo">Link reduce</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><NavLink to="/create">Create</NavLink></li>
          <li><NavLink to="/Links">Links</NavLink></li>
          <li><a href="/create" onClick={looutHandler}>Logout</a></li>
        </ul>
      </div>
    </nav>
  )
}