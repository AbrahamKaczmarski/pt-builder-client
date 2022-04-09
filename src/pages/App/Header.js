import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './App.module.css'

import { useGlobal, useStyles } from '../../hooks'

const exclusions = ['/login', '/register']

const Header = () => {
  const { pathname } = useLocation()
  const s = useStyles(styles)

  const { user, signOut } = useGlobal()

  if (exclusions.includes(pathname)) {
    return (
      <header className={s('', 'header clean')}>
        <p>
          <Link to='/'>Home</Link>
        </p>
      </header>
    )
  }

  return (
    <header className={s('', 'header')}>
      <h1>
        <Link to='/'>PokeTeam Builder</Link>
      </h1>
      <p>
        {user ? (
          <button className='inline-btn' onClick={signOut}>
            Logout
          </button>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </p>
    </header>
  )
}

export default Header
