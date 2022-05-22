import { Link, useLocation } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'

import { useGlobal, useStyles } from 'hooks'

import styles from 'styles/App.module.css'

import { LogoInlineImg } from 'assets/img'

import {
  ArrowBackIcon,
  ExitIcon,
  ListIcon,
  PenIcon,
  PlusIcon,
  UserIcon
} from 'assets/icons'

const exclusions = ['/login', '/register']

const Header = () => {
  const { pathname } = useLocation()
  const { user, signOut, invitations } = useGlobal()

  const s = useStyles(styles)
  // const { t } = useTranslation(null, { keyPrefix: 'App.Header' })

  if (exclusions.includes(pathname)) {
    return (
      <header className={s('header clean')}>
        <p>
          <Link to='/' className={s('link-home', 'link')}>
            <span className='icon'>
              <ArrowBackIcon />
            </span>
            <span>Home</span>
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
        {!pathname.match(/^\/teams/) && (
          <Link to='/teams'>
            <div className={s('nav-link')}>
              <ListIcon />
            </div>
          </Link>
        )}
        {user ? (
          <>
            {pathname !== '/profile' && (
              <Link to='/profile'>
                <div className={s('nav-link')}>
                  <UserIcon />
                  {invitations.received?.length > 0 && (
                    <div className={s('nav-link-indicator')}>
                      {invitations.received.length}
                    </div>
                  )}
                </div>
              </Link>
            )}
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
