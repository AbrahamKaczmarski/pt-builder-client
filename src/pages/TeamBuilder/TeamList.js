import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useGlobal, useStyles, useToaster } from 'hooks'
import { getTeamList, getTeamListByUser } from 'services'

import TeamListRow from './TeamListRow'

import styles from 'styles/TeamBuilder.module.css'

const TeamList = () => {
  const navigate = useNavigate()
  const { userId } = useParams()

  const { showError } = useToaster()
  const { authenticated, initialized, pokedex } = useGlobal()

  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'TeamBuilder.TeamList' })

  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [teams, setTeams] = useState([])

  const searchFilter = team => {
    const tmpl = new RegExp(filter.split('').join('.*'), 'i')
    return tmpl.test(team.name)
  }

  useEffect(() => {
    if (!initialized) return
    if (!authenticated) {
      navigate('/')
      return
    }
    let mounted = true
    const getTeams =
      userId == null ? getTeamList : () => getTeamListByUser(userId)
    setLoading(true)
    getTeams()
      .then(({ data }) => {
        if (!mounted) return
        setTeams(data)
      })
      .catch(err => {
        showError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [authenticated, initialized])

  if (!initialized | !authenticated) {
    return <></>
  }

  if (loading || !pokedex) {
    return (
      <main className={s('empty', 'card main flow')}>
        <p className={s('empty-text')}>
          {userId ? t('TextUserLoading') : t('TextLoading')}
        </p>
      </main>
    )
  }

  return (
    <main className='card main flow'>
      <h2>
        {userId
          ? t('HeadingUserTeamList', {
              user: teams?.[0]?.user?.username ?? userId
            })
          : t('HeadingTeamList')}
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
        <section>
          <ul className={s('team-list', 'table-body')}>
            {teams.filter(searchFilter).map(team => (
              <TeamListRow
                team={team}
                onDelete={() =>
                  setTeams(prev => prev.filter(t => t._id !== team._id))
                }
                onPublish={() => {
                  setTeams(prev =>
                    prev.map(t =>
                      t._id === team._id ? { ...t, public: !t.public } : t
                    )
                  )
                }}
                editable={!userId}
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
