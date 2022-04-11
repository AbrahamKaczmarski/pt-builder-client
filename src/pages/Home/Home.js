import React from 'react'
import { useTranslation } from 'react-i18next'
import { useStyles } from '../../hooks'

import styles from './Home.module.css'
import PokemonCard from './PokemonCard'

const data = [
  {
    name: 'Magikarp',
    level: 11,
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/0/02/129Magikarp.png/250px-129Magikarp.png'
  },
  {
    name: 'Riolu',
    level: 17,
    image:
      'https://assets.pokemon.com/assets/cms2/img/pokedex/full/447.png'
  }
]

const Home = () => {
  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'Home' })

  return (
    <main className='card main flow'>
      <h2 className='heading'>{t('HeadingTeamBuilder')}</h2>
      <section className='enemy-team'>
        <h3 className='heading'>{t('HeadingEnemyTeam')}</h3>
        <div className={s('cards')}>
          {data.map((item, key) => (
            <PokemonCard pokemon={item} idx={key} key={key} />
          ))}
          {data.length <= 6 && <PokemonCard />}
        </div>
      </section>
      <section className='options'>
        <h3 className='heading'>{t('HeadingOptions')}</h3>
        <form className={s('form')}>
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
          </label>
        </form>
      </section>
    </main>
  )
}

export default Home
