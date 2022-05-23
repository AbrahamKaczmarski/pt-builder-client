import React, { useEffect, useState } from 'react'
import { useGlobal, useStyles } from 'hooks'

import styles from 'styles/TeamBuilder.module.css'

import { PlusIcon, XMarkIcon } from 'assets/icons'

const PokemonCard = ({ idx, dispatch, pokemon }) => {
  const { pokedex, randomPokemon } = useGlobal()

  const s = useStyles(styles)

  if (pokemon == null) {
    return (
      <div className={s('pokemon-card empty', 'card')}>
        <button
          className='icon-btn xl'
          onClick={() => {
            dispatch({
              action: 'ADD',
              payload: randomPokemon()
            })
          }}
          disabled={pokedex == null}
        >
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
              payload: { idx, value: pokedex[e.target.value] }
            })
          }}
          value={pokemon._id}
        >
          {Object.entries(pokedex)
            .sort(([_1, { name: a }], [_2, { name: b }]) =>
              a > b ? 1 : a < b ? -1 : 0
            )
            .map(([id, { name }]) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
        </select>
        <button
          className={s('icon-close', 'icon-btn sm')}
          onClick={() => {
            dispatch({ action: 'REMOVE', payload: { idx } })
          }}
        >
          <XMarkIcon />
        </button>
      </header>
      <div className='card-body'>
        <div className={s('pokemon-data')}>
          <div>
            <div className={s('pokemon-icon')}>
              <img src={pokemon.sprites[0]} alt={pokemon.name} />
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
