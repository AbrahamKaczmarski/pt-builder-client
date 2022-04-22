import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { useGlobal, useStyles } from '../../hooks'

import styles from './Profile.module.css'

const Profile = () => {
  const navigate = useNavigate()

  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'Profile' })

  const { authenticated, user } = useGlobal()

  useEffect(() => {
    if (!authenticated) {
      navigate('/')
    }
  }, [authenticated])

  return (
    <main className='card main flow'>
      <div className='card-header'>
        <h2 className={s('profile-heading', 'heading')}>
          <img
            className={s('profile-picture')}
            src='https://i.pinimg.com/736x/57/3f/22/573f22a1aa17b366f5489745dc4704e1.jpg'
            alt='Profile picture'
          />
          {user.name}
        </h2>
      </div>
      <div className={s('card-body', 'card-body')}>
        <section className={s('account', 'flow')}>
          <h3 className={s('heading')}>{t('HeadingAccount')}</h3>
          <div>
            <p className={s('field-label')}>{t('TextUsername')}</p>
            <p>
              <span className={s('field-value')}>{user.name}</span>{' '}
              <button className='inline-btn'>{t('ButtonEdit')}</button>
            </p>
          </div>
          <div>
            <p className={s('field-label')}>{t('TextEmail')}</p>
            <p>
              <span className={s('field-value')}>{user.email}</span>{' '}
              <button className='inline-btn'>{t('ButtonEdit')}</button>
            </p>
          </div>
          <div>
            <p className={s('field-label')}>{t('TextPassword')}</p>
            <p>
              <button className='inline-btn'>{t('ButtonEdit')}</button>
            </p>
          </div>
        </section>
        <section className={s('friends')}>
          <h3 className={s('heading')}>{t('HeadingFriends')}</h3>
        </section>
        <section className={s('administration')}>
          <h3 className={s('heading')}>{t('HeadingAdministration')}</h3>
          <p>
            <Link className='link' to='/rule-editor'>{t('LinkRuleEditor')}</Link>
          </p>
        </section>
      </div>
    </main>
  )
}

export default Profile
