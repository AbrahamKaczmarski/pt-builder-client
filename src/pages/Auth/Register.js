import React from 'react'
import { useTranslation } from 'react-i18next'
import { useStyles } from '../../hooks'

import AuthNav from './AuthNav'

import styles from './Auth.module.css'

const Register = () => {
  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'Auth.Register' })

  return (
    <main className={s('', 'layout')}>
      <AuthNav login />
      <section className='card'>
        <div className='card-header'>
          <h2>{t('HeadingSignIn')}</h2>
        </div>
        <div className='card-body'>
          <form className='form'>
            <div className='form-item controls'>
              <button className='btn primary'>{t('ButtonRegister')}</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Register
