import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams, useSearchParams } from 'react-router-dom'

import { useStyles } from 'hooks'

import styles from 'styles/TeamBuilder.module.css'

const TeamList = () => {
  const { user } = useParams()

  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'TeamBuilder.TeamList' })

  useEffect(() => {
    console.log(user)
  }, user)

  // -- Form
  const { handleSubmit, register } = useForm({
    defaultValues: {
      phrase: ''
    }
  })

  // -- Login action
  const onSubmit = async data => {
    console.log(data)
  }

  return (
    <main className='card main flow'>
      <h2>
        {user ? t('HeadingUserTeamList', { user }) : t('HeadingTeamList')}
      </h2>
      <section className={s('controls')}>
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
        </form>
      </section>
      <section className='table'>
        <header className='table-header'>
          <p className={s('th', 'col')} data-column='name'>
            {t('ThName')}
          </p>
          <p className={s('th', 'col')} data-column='created'>
            {t('ThCreated')}
          </p>
          <p className={s('th', 'col')} data-column='team'>
            {t('ThTeam')}
          </p>
          <p className={s('th', 'col')} data-column='enemies'>
            {t('ThEnemies')}
          </p>
          <p className={s('th', 'col')} data-column='actions'>
            {t('ThActions')}
          </p>
        </header>
        <div className='table-body'></div>
      </section>
    </main>
  )
}

export default TeamList
