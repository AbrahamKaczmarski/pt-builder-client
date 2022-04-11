import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import styles from './App.module.css'

import { useGlobal, useStyles } from '../../hooks'
import { LogoInlineImg } from '../../assets/img'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

import {
  ExitIcon,
  ListIcon,
  PenIcon,
  PlusIcon,
  UserIcon
} from '../../assets/icons'

const exclusions = ['/login', '/register']

const Header = () => {
  const { pathname } = useLocation()
  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'App.Header' })

  const { user, signOut } = useGlobal()

  if (exclusions.includes(pathname)) {
    return (
      <header className={s('header clean')}>
        <p>
          <Link to='/' className='link'>
            Home
          </Link>
        </p>
      </header>
    )
  }

  return (
    <header className={s('header')}>
      <div>
        <h1>
          <Link to='/'>
            <img className={s('logo')} src={LogoInlineImg} />
          </Link>
        </h1>
      </div>
      <nav className={s('nav')}>
        {pathname !== '/' && (
          <Link to='/'>
            <div className={s('nav-link primary')}>
              <PlusIcon />
            </div>
          </Link>
        )}
        {pathname !== '/teams' && (
          <Link to='/teams'>
            <div className={s('nav-link')}>
              <ListIcon />
            </div>
          </Link>
        )}
        {user ? (
          <>
            <Link to='/profile'>
              <div className={s('nav-link')}>
                <UserIcon />
              </div>
            </Link>
            <div className={s('nav-link')} onClick={signOut}>
              <ExitIcon />
            </div>
          </>
        ) : (
          <Link to='/login'>
            <div className={s('nav-link primary')}>
              <PenIcon />
            </div>
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header
