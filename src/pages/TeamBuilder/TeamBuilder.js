import React, { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'

import { useGlobal, useStyles } from 'hooks'

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
  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'TeamBuilder' })

  const [data, dispatch] = useReducer(reducer, [])

  return (
    <main className='card main flow'>
      <h2 className='heading'>{t('HeadingTeamBuilder')}</h2>
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
        <form className={s('form')}>
          {/* <h3 className='heading'>{t('HeadingOptions')}</h3>
          <label htmlFor='option-1' className={s('form-item input')}>
            <p className={s('input-label')}>{t('InputOption1')}</p>
            <input type='text' className={s('input-field')} />
          </label>
          <label htmlFor='option-2' className={s('form-item input')}>
            <p className={s('input-label')}>{t('InputOption1')}</p>
            <input type='number' className={s('input-field')} />
          </label>
          <label htmlFor='option-3' className={s('form-item input')}>
            <p className={s('input-label')}>{t('InputOption1')}</p>
            <select>
              <option value='A'>Option A</option>
              <option value='B'>Option B</option>
              <option value='C'>Option C</option>
              <option value='D'>Option D</option>
            </select>
          </label> */}
        </form>
        <button className='btn primary'>{t('ButtonGenerate')}</button>
      </section>
    </main>
  )
}

export default TeamBuilder
