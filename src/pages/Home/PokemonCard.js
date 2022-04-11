import React from 'react'
import { useStyles } from '../../hooks'

import styles from './Home.module.css'

import {PlusIcon} from '../../assets/icons'

const PokemonCard = ({ pokemon, idx }) => {
  const s = useStyles(styles)

  if (!pokemon) {
    return (
      <div className={s('pokemon-card empty', 'card')}>
        <p>+</p>
      </div>
    )
  }

  return (
    <div className={s('pokemon-card', 'card small')}>
      <header className={s('card-header', 'card-header')}>
        <p>{pokemon.name}</p>
        <div>
          <PlusIcon className={s('icon-close')} />
        </div>
      </header>
      <div className='card-body'>
        <div className={s('pokemon-data')}>
          <div>
            <div className={s('pokemon-icon')}>
              <img src={pokemon.image} alt={pokemon.name} />
            </div>
          </div>
          <div className={s('pokemon-settings')}>
            <label
              htmlFor={`p${idx + 1}-setting1`}
              className={s('setting')}
            >
              <p className={s('setting-label')}>Test</p>
              <input
                type='text'
                className={s('setting-input')}
                id={`p${idx + 1}-setting1`}
              />
            </label>
            <label
              htmlFor={`p${idx + 1}-setting2`}
              className={s('setting')}
            >
              <p className={s('setting-label')}>Setting 2</p>
              <input
                type='number'
                className={s('setting-input')}
                id={`p${idx + 1}-setting2`}
              />
            </label>
            <label
              htmlFor={`p${idx + 1}-setting3`}
              className={s('setting')}
            >
              <p className={s('setting-label')}>Label</p>
              <input
                type='text'
                className={s('setting-input')}
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
