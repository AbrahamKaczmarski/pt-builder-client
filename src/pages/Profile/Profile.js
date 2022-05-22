import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { useGlobal, useStyles } from 'hooks'

import Modal from 'components/Modal/Modal'

import styles from 'styles/Profile.module.css'
import { CheckmarkIcon, ListIcon, XMarkIcon } from 'assets/icons'
import useToaster from 'hooks/useToaster'
import {
  getFriendList,
  invitationAccept,
  invitationCancel,
  invitationReject,
  inviteFriend,
  updateUser
} from 'services'

const pokeballUrl =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png'

const fieldIds = {
  TextEmail: 'email',
  TextUsername: 'name'
}

const Profile = () => {
  const navigate = useNavigate()

  const {
    authenticated,
    user,
    invitations,
    updateUserData,
    updateInvitations
  } = useGlobal()
  const { showSuccess, showInfo, showError } = useToaster()

  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'Profile' })

  const [modal, setModal] = useState(false)

  const [newFriend, setNewFriend] = useState('')
  const [edit, setEdit] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [filter, setFilter] = useState('')

  const searchFilter = friend => {
    const tmpl = new RegExp(filter.split('').join('.*'), 'i')
    return tmpl.test(friend.username)
  }

  const editField = field => {
    setEdit(field)
    setEditValue(user[fieldIds[field]])
  }

  const accept = id => {
    invitationAccept(id)
      .then(() => {
        showSuccess(t('TextInvitationAccepted'))
        updateInvitations()
      })
      .catch(err => {
        showError(err.message)
      })
  }

  const deny = id => {
    invitationReject(id)
      .then(() => {
        showSuccess(t('TextInvitationRejected'))
        updateInvitations()
      })
      .catch(err => {
        showError(err.message)
      })
  }

  const cancel = id => {
    invitationCancel(id)
      .then(() => {
        showSuccess(t('TextInvitationCancelled'))
        updateInvitations()
      })
      .catch(err => {
        showError(err.message)
      })
  }

  useEffect(() => {
    !authenticated && navigate('/')
  }, [authenticated])

  if (!authenticated) {
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
              <button
                className='inline-btn'
                onClick={() => editField('TextUsername')}
              >
                {t('ButtonEdit')}
              </button>
            </p>
          </div>
          <div>
            <p className={s('field-label')}>{t('TextEmail')}</p>
            <p>
              <span className={s('field-value')}>{user.email}</span>{' '}
              <button
                className='inline-btn'
                onClick={() => editField('TextEmail')}
              >
                {t('ButtonEdit')}
              </button>
            </p>
          </div>
          <div>
            <p className={s('field-label')}>{t('TextPassword')}</p>
            <p>
              <button
                className='inline-btn'
                onClick={() => editField('TextPassword')}
              >
                {t('ButtonEdit')}
              </button>
            </p>
          </div>
        </section>
        <section className={s('friends')}>
          <header className={s('row')}>
            <h3 className={s('heading')}>{t('HeadingFriends')}</h3>
            <button
              className={s('add-friends', 'btn sm secondary')}
              onClick={() => setModal(true)}
            >
              {t('ButtonAddFriends')}
              {invitations.received.length > 0 && (
                <div className={s('add-friends-label')}>
                  {invitations.received.length}
                </div>
              )}
            </button>
          </header>
          <label htmlFor='search-phrase' className={`form-item input`}>
            <input
              type='text'
              className='input-field'
              id='search-phrase'
              placeholder={t('InputSearch')}
              value={filter}
              onChange={({ target }) => {
                setFilter(target.value)
              }}
            />
            <p className='input-label'>{t('InputSearch')}</p>
          </label>
          <div className={s('friend-list')}>
            {user.friends.length === 0 && (
              <p className={s('no-friends')}>{t('TextNoFriends')}</p>
            )}
            {user.friends.filter(searchFilter).map(friend => (
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
                    onClick={() => navigate(`/teams/${friend.username}`)}
                  >
                    <ListIcon />
                  </button>
                  {/* <button className={s('remove-icon', 'icon-btn')}>
                    <XMarkIcon />
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </section>
        {user.roles.includes('admin') && (
          <section className={s('administration')}>
            <h3 className={s('heading')}>{t('HeadingAdministration')}</h3>
            <p>
              <Link className='link' to='/rule-editor'>
                {t('LinkRuleEditor')}
              </Link>
            </p>
          </section>
        )}
      </div>
      <Modal open={modal} onClose={() => setModal(false)}>
        <h2 className='heading'>{t('HeadingAddFriends')}</h2>
        <h3>{t('HeadingAddFriend')}</h3>
        <div className={s('form-field')}>
          <input
            type='text'
            className={s('form-input')}
            value={newFriend}
            onChange={({ target }) => setNewFriend(target.value)}
          />
          <button
            className='btn sm secondary'
            onClick={() => {
              inviteFriend(newFriend)
                .then(() => {
                  showSuccess(t('SuccessAddFriend'))
                  updateInvitations()
                })
                .catch(err => {
                  showError(err.message)
                })
            }}
          >
            {t('ButtonInvite')}
          </button>
        </div>
        {invitations.sent?.length > 0 && (
          <div className={s('invitation-list', 'flow')}>
            <h3>{t('HeadingYourInvitations')}</h3>
            {invitations.sent?.map(({ _id, requestee }) => (
              <div className={s('invitation')} key={_id}>
                <img
                  src={pokeballUrl}
                  alt={requestee.username}
                  className={s('friend-img')}
                />
                <span className={s('invitation-name')}>
                  {requestee.username}
                </span>
                <div className={s('friend-controls')}>
                  <button
                    className={s('deny', 'icon-btn sm')}
                    onClick={() => cancel(_id)}
                  >
                    <XMarkIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <h3>{t('HeadingInvitations')}</h3>
        {invitations.received?.length > 0 ? (
          <div className={s('invitation-list', 'flow')}>
            {invitations.received?.map(({ _id, requester }) => (
              <div className={s('invitation')} key={_id}>
                <img
                  src={pokeballUrl}
                  alt={requester.username}
                  className={s('friend-img')}
                />
                <span className={s('invitation-name')}>
                  {requester.username}
                </span>
                <div className={s('friend-controls')}>
                  <button
                    className={s('accept', 'icon-btn sm')}
                    onClick={() => accept(_id)}
                  >
                    <CheckmarkIcon />
                  </button>
                  <button
                    className={s('deny', 'icon-btn sm')}
                    onClick={() => deny(_id)}
                  >
                    <XMarkIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>{t('TextNoInvitations')}</p>
        )}
      </Modal>
      <Modal
        modalClassName='xs'
        open={edit != null}
        onClose={() => setEdit(null)}
      >
        <h2>{t(edit)}</h2>
        <label className={s('form-field')}>
          <input
            type='text'
            defaultValue={user[fieldIds[edit]] ?? ''}
            className={s('form-input')}
            onChange={({ target }) => setEditValue(target.value)}
          />
        </label>
        <div className={s('controls')}>
          <button
            className='btn primary'
            disabled={editValue === user[fieldIds[edit]]}
            onClick={() => {
              updateUser(fieldIds[edit], editValue)
                .then(({ data }) => {
                  console.log(data)
                  updateUserData(data)
                  setEdit(null)
                })
                .catch(err => {
                  showError(err.message)
                })
            }}
          >
            {t('ButtonSave')}
          </button>
        </div>
      </Modal>
    </main>
  )
}

export default Profile
