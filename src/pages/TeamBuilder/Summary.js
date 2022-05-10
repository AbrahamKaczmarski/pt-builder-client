import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useStyles } from 'hooks'

import styles from 'styles/TeamBuilder.module.css'

import { pokedex, teams } from 'mockup'

const Summary = () => {
  const { id } = useParams()

  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'TeamBuilder.Summary' })

  const [team, setTeam] = useState(teams.filter(team => team.name === id)[0])

  return (
    <main className='card main flow'>
      <header className='flow'>
        <h2>{id}</h2>
        <p>{t('TextIntroduction')}</p>
        <p>
          {team.enemies.map(pokemon => (
            <img
              src={pokedex[pokemon]}
              alt={pokemon}
              className={s('portrait-lg')}
            />
          ))}
        </p>
      </header>
      <section className={s('results')}>
        <h3 className={s('heading-picks')}>{t('HeadingPicks')}</h3>
        <p className={s('team-picks')}>
          {team.picks.map(pokemon => (
            <img
              src={pokedex[pokemon]}
              alt={pokemon}
              className={s('portrait-xl')}
            />
          ))}
        </p>
      </section>
    </main>
  )
}

export default Summary
