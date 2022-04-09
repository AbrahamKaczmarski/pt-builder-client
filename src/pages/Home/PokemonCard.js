import { t } from 'i18next'
import React from 'react'
import { useStyles } from '../../hooks'

import styles from './Home.module.css'

const PokemonCard = ({ pokemon, idx }) => {
  const s = useStyles(styles)

  if (!pokemon) {
    return (
      <div className={s('card', 'pokemon-card empty')}>
        <p>+</p>
      </div>
    )
  }

  return (
    <div className={s('card small', 'pokemon-card')}>
      <header className='card-header'>
        <p>{pokemon.name}</p>
      </header>
      <div className='card-body'>
        <div className={s('', 'pokemon-data')}>
          <div>
            <div className={s('', 'pokemon-icon')}>
              <img src={pokemon.image} alt={pokemon.name} />
            </div>
          </div>
          <div>
            <label
              htmlFor={`p${idx + 1}-setting1`}
              className={s('', 'setting')}
            >
              <p className={s('', 'setting-label')}>Setting 1</p>
              <input
                type='text'
                className={s('', 'setting-input')}
                id={`p${idx + 1}-setting1`}
              />
            </label>
            <label
              htmlFor={`p${idx + 1}-setting2`}
              className={s('', 'setting')}
            >
              <p className={s('', 'setting-label')}>Setting 2</p>
              <input
                type='text'
                className={s('', 'setting-input')}
                id={`p${idx + 1}-setting2`}
              />
            </label>
            <label
              htmlFor={`p${idx + 1}-setting3`}
              className={s('', 'setting')}
            >
              <p className={s('', 'setting-label')}>Setting 3</p>
              <input
                type='text'
                className={s('', 'setting-input')}
                id={`p${idx + 1}-setting3`}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonCard
