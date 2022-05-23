import React, { useReducer, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useStyles, useToaster } from 'hooks'

import PokemonCard from './PokemonCard'

import styles from 'styles/TeamBuilder.module.css'
import { generateTeam } from 'services'

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

  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'TeamBuilder' })

  const [name, setName] = useState('')
  const [data, dispatch] = useReducer(reducer, [])

  return (
    <main className='card main flow'>
      <h2 className='heading'>{t('HeadingTeamBuilder')}</h2>
      <label>
        <span>{t('InputTeamName')}</span>
        <input
          type='text'
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
        <form className={s('form')}></form>
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
                navigate(`/team/${data._id}`)
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
