import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useGlobal, useStyles } from 'hooks'
import { getTeamList } from 'services'

import TeamListRow from './TeamListRow'

import styles from 'styles/TeamBuilder.module.css'

const TeamList = () => {
  const navigate = useNavigate()
  const { user } = useParams()
  const { authenticated, initialized } = useGlobal()

  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'TeamBuilder.TeamList' })

  const [filter, setFilter] = useState('')
  const [teams, setTeams] = useState([])

  const searchFilter = team => {
    const tmpl = new RegExp(filter.split('').join('.*'), 'i')
    return tmpl.test(team.name)
  }

  useEffect(() => {
    if (!initialized) return
    if (!authenticated) {
      console.log('navigating')
      navigate('/')
      return
    }
    let mounted = true
    getTeamList().then(({ data }) => {
      if (!mounted) return
      setTeams(data)
    })
    return () => {
      mounted = false
    }
  }, [authenticated, initialized])

  if (!initialized | !authenticated) {
    return <></>
  }

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
      {teams?.length === 0 ? (
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
            {teams.filter(searchFilter).map(team => (
              <TeamListRow
                team={team}
                onDelete={() =>
                  setTeams(prev => prev.filter(t => t._id !== team._id))
                }
                editable={!user}
                key={team._id}
              />
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}

export default TeamList
