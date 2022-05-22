import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useStyles } from 'hooks'

import styles from 'styles/TeamBuilder.module.css'
import { teams } from 'mockup'
import TeamListRow from './TeamListRow'
import { getTeamList } from 'services'

const TeamList = () => {
  const { user } = useParams()

  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'TeamBuilder.TeamList' })

  const [filter, setFilter] = useState('')
  const [teamList, setTeamList] = useState([])

  const searchFilter = team => {
    const tmpl = new RegExp(filter.split('').join('.*'), 'i')
    return tmpl.test(team.name)
  }

  useEffect(() => {
    let mounted = true
    getTeamList().then(({ data }) => {
      if (!mounted) return
      setTeamList(data)
    })
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    console.log(teamList)
  }, [teamList])

  return (
    <main className='card main flow'>
      <h2>
        {user ? t('HeadingUserTeamList', { user }) : t('HeadingTeamList')}
      </h2>
      <section className={s('controls')}>
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
      </section>
      {teamList?.length === 0 ? (
        <p>{t('TextNoTeams')}</p>
      ) : (
        <section className='table'>
          <header className='table-header'>
            <p className={s('th col-name', 'col')} data-column='name'>
              {t('ThName')}
            </p>
            <p className={s('th col-date', 'col')} data-column='created'>
              {t('ThCreated')}
            </p>
            <p className={s('th col-team', 'col')} data-column='team'>
              {t('ThTeam')}
            </p>
            <p className={s('th col-enemies', 'col')} data-column='enemies'>
              {t('ThEnemies')}
            </p>
            <p className={s('th col-actions', 'col')} data-column='actions'>
              {t('ThActions')}
            </p>
          </header>
          <ul className={s('team-list', 'table-body')}>
            {/* TODO: remove filter */}
            {teamList
              .filter(user ? e => e.public : () => true)
              .filter(searchFilter)
              .map(team => (
                <TeamListRow team={team} editable={!user} key={team.id} />
              ))}
          </ul>
        </section>
      )}
    </main>
  )
}

export default TeamList
