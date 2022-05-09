import React from 'react'
import { useStyles } from 'hooks'

import styles from 'styles/TeamBuilder.module.css'

import { PlusIcon, XMarkIcon } from 'assets/icons'

export const index = {
  Bulbasaur: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
  Caterpie: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png',
  Charmander: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
  Clefairy: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png',
  Ekans: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/023.png',
  Jigglypuff: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png',
  Nidoran: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/029.png',
  Oddish: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/043.png',
  Pidgey: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png',
  Pikachu: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
  Rattata: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/019.png',
  Sandshrew: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/027.png',
  Spearow: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/021.png',
  Squirtle: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
  Weedle: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/013.png',
  Zubat: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/041.png'
}

const PokemonCard = ({ idx, dispatch, pokemon }) => {
  const s = useStyles(styles)

  if (!pokemon) {
    return (
      <div className={s('pokemon-card empty', 'card')}>
        <button
          className='icon-btn xl'
          onClick={() =>
            dispatch({
              action: 'ADD',
              payload: { name: Object.keys(index)[0] }
            })
          }>
          <PlusIcon />
        </button>
      </div>
    )
  }

  return (
    <div className={s('pokemon-card', 'card small')}>
      <header className={s('card-header', 'card-header')}>
        <select
          className={s('select-input')}
          id={`pokemon-${idx}`}
          onChange={e => {
            dispatch({
              action: 'CHANGE',
              payload: { idx, value: e.target.value }
            })
          }}>
          {Object.keys(index).map(key => (
            <option value={key} key={key}>
              {key}
            </option>
          ))}
        </select>
        <button
          className={s('icon-close', 'icon-btn sm')}
          onClick={() => {
            dispatch({ action: 'REMOVE', payload: { idx } })
          }}>
          <XMarkIcon />
        </button>
      </header>
      <div className='card-body'>
        <div className={s('pokemon-data')}>
          <div>
            <div className={s('pokemon-icon')}>
              <img src={index[pokemon.name]} alt={pokemon.name} />
            </div>
          </div>
          {/* <div className={s('pokemon-settings')}>
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
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default PokemonCard
