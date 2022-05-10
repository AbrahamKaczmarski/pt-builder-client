import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { useGlobal, useStyles } from 'hooks'

import Modal from 'components/Modal/Modal'

import styles from 'styles/Profile.module.css'
import { CheckmarkIcon, ListIcon, XMarkIcon } from 'assets/icons'
import useToaster from 'hooks/useToaster'

const pokeballUrl =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png'

const db = [
  {
    id: '6269231861cd16d0f0f66838',
    username: 'User 2'
  }
]

const waiting = [
  {
    id: '3',
    username: 'User 3'
  },
  {
    id: '4',
    username: 'User 4'
  }
]

const Profile = () => {
  const navigate = useNavigate()

  const { authenticated, user } = useGlobal()
  const { showSuccess, showInfo } = useToaster()

  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'Profile' })

  const [friends, setFriends] = useState(db)
  const [invites, setInvites] = useState([])
  const [modal, setModal] = useState(false)

  const accept = id => {
    const [user] = invites.filter(user => user.id === id)
    setFriends(prev => [...prev, user])
    setInvites(prev => prev.filter(user => user.id !== id))
    showSuccess('Invitation accepted')
  }

  const deny = id => {
    setInvites(prev => prev.filter(user => user.id !== id))
    showInfo('Invitation rejected')
  }

  // -- Form
  const {
    handleSubmit,
    register,
    formState: { isDirty }
  } = useForm({
    defaultValues: {
      phrase: ''
    }
  })

  // -- Login action
  const onSubmit = async data => {
    console.log(data)
  }

  if (!authenticated) {
    navigate('/')
    return <></>
  }

  return (
    <main className='card main flow'>
      <div className='card-header'>
        <h2 className={s('profile-heading', 'heading')}>
          <img
            className={s('profile-picture')}
            src={pokeballUrl}
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
          {invites.length > 0 && (
            <div>
              <button className='inline-btn' onClick={() => setModal(true)}>
                {t('ButtonInvitations', { amount: invites.length })}
              </button>
            </div>
          )}
          <form
            className={s('search-form', 'search-form')}
            onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='search-phrase' className={`form-item input`}>
              <input
                type='text'
                className='input-field'
                id='search-phrase'
                placeholder={t('InputSearch')}
                {...register('phrase')}
              />
              <p className='input-label'>{t('InputSearch')}</p>
            </label>
            <button className='btn primary' disabled={!isDirty}>
              {t('ButtonInvite')}
            </button>
          </form>
          <div className={s('friend-list')}>
            {friends.map(friend => (
              <div className={s('friend-row')} key={friend.id}>
                <img
                  src={pokeballUrl}
                  alt={friend.username}
                  className={s('friend-img')}
                />
                <p className={s('friend-name')}>{friend.username}</p>
                <div className={s('friend-controls')}>
                  <button
                    className={s('list-icon', 'icon-btn')}
                    onClick={() => navigate(`/teams/${friend.username}`)}>
                    <ListIcon />
                  </button>
                  <button className={s('remove-icon', 'icon-btn')}>
                    <XMarkIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className={s('administration')}>
          <h3 className={s('heading')}>{t('HeadingAdministration')}</h3>
          <p>
            <Link className='link' to='/rule-editor'>
              {t('LinkRuleEditor')}
            </Link>
          </p>
        </section>
      </div>
      <Modal open={modal} onClose={() => setModal(false)}>
        <h2 className='heading'>{t('HeadingInvitations')}</h2>
        <div className={s('invitation-list', 'flow')}>
          {invites.map(friend => (
            <p className={s('invitation')}>
              <img
                src={pokeballUrl}
                alt={friend.username}
                className={s('friend-img')}
              />
              <span className={s('invitation-name')}>{friend.username}</span>
              <div className={s('friend-controls')}>
                <button
                  className={s('accept', 'icon-btn sm')}
                  onClick={() => accept(friend.id)}>
                  <CheckmarkIcon />
                </button>
                <button
                  className={s('deny', 'icon-btn sm')}
                  onClick={() => deny(friend.id)}>
                  <XMarkIcon />
                </button>
              </div>
            </p>
          ))}
        </div>
      </Modal>
    </main>
  )
}

export default Profile
