import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useGlobal, useStyles } from 'hooks'

import styles from 'styles/TeamBuilder.module.css'

import { getTeam } from 'services'

const Summary = () => {
  const { id } = useParams()
  const { initialized, authenticated, pokedex } = useGlobal()

  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'TeamBuilder.Summary' })

  const [team, setTeam] = useState(null)

  useEffect(() => {
    if (!initialized) return
    if (!authenticated) return

    getTeam(id).then(({ data }) => {
      console.log(data)
      setTeam(data)
    })
  }, [initialized, authenticated, setTeam])

  if (!initialized || !authenticated) {
    return <></>
  }

  if (team == null || !pokedex) {
    return (
      <main className='card main flow'>
        <p>Loading</p>
      </main>
    )
  }

  return (
    <main className='card main flow'>
      <header className='flow'>
        <h2>{team.name}</h2>
        <p>{t('TextIntroduction')}</p>
        <p>
          {team.team.pokemons.map(({ _id: pokemon }, idx) => (
            <img
              src={pokedex[pokemon].sprites[0]}
              alt={pokedex[pokemon].name}
              className={s('portrait-lg')}
              key={idx}
            />
          ))}
        </p>
      </header>
      <section className={s('results')}>
        <h3 className={s('heading-picks')}>{t('HeadingPicks')}</h3>
        <p className={s('team-picks')}>
          {team.facts.map(({ _id: pokemon }, idx) => (
            <img
              src={pokedex[pokemon].sprites[0]}
              alt={pokedex[pokemon].name}
              className={s('portrait-xl')}
              key={idx}
            />
          ))}
        </p>
      </section>
    </main>
  )
}

export default Summary
