import React, { useReducer, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { addLocalTeam } from 'cache'
import { useGlobal, useStyles, useToaster } from 'hooks'
import { generateTeam } from 'services'

import PokemonCard from './PokemonCard'

import styles from 'styles/TeamBuilder.module.css'

const reducer = (state, { action, payload }) => {
  switch (action) {
    case 'ADD':
      return [...state, payload]
    case 'CHANGE':
      const { idx, value } = payload
      return state.map((v, i) => (i === idx ? value : v))
    case 'REMOVE':
      return state.filter((v, i) => i !== payload.idx)
    default:
      return state
  }
}

const TeamBuilder = () => {
  const navigate = useNavigate()

  const { showError, showInfo } = useToaster()
  const { pokedex, authenticated } = useGlobal()

  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'TeamBuilder' })

  const [name, setName] = useState('Your Team')
  const [data, dispatch] = useReducer(reducer, [])

  if (!pokedex) {
    return (
      <main className={s('empty', 'card main flow')}>
        <p className={s('empty-text')}>{t('TextLoading')}</p>
      </main>
    )
  }

  return (
    <main className='card main flow'>
      <label>
        <input
          type='text'
          className={s('team-name')}
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </label>
      <section className='enemy-team'>
        <h3 className='heading'>{t('HeadingEnemyTeam')}</h3>
        <div className={s('cards')}>
          {data.map((item, key) => (
            <PokemonCard
              pokemon={item}
              idx={key}
              dispatch={dispatch}
              key={key}
            />
          ))}
          {data.length < 6 && <PokemonCard dispatch={dispatch} />}
        </div>
      </section>
      <section className={s('options')}>
        <button
          className='btn primary'
          onClick={() => {
            if (!(data?.length > 0)) {
              showInfo(t('InfoAmount'))
              return
            }
            const form = {
              name: name?.length > 0 ? name : 'My Team',
              enemyPokemons: data.map(pokemon => pokemon._id)
            }
            generateTeam(form)
              .then(({ data }) => {
                if (authenticated) {
                  navigate(`/team/${data._id}`)
                  return
                }
                navigate(`/team/local-${addLocalTeam(data)}`)
              })
              .catch(err => {
                showError(err.message)
              })
          }}
        >
          {t('ButtonGenerate')}
        </button>
      </section>
    </main>
  )
}

export default TeamBuilder
