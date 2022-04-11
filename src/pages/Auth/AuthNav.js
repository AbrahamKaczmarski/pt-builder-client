import React from 'react'
import { Trans } from 'react-i18next'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { LogoImg } from '../../assets/img'
import { useStyles } from '../../hooks'

import styles from './Auth.module.css'

const AuthNav = ({ login, register }) => {
  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'Auth.AuthLogo' })

  return (
    <section className={s('logo')}>
      <h1>
        <img src={LogoImg} />
      </h1>
      <Trans
        t={t}
        i18nKey='TextCommunity'
        components={[
          login && <Link to='/login' className='link'/>,
          register && <Link to='/register' className='link'/>
        ]}
      />
    </section>
  )
}

export default AuthNav
