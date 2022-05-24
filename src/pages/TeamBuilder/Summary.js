import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getCache, removeLocalTeam, updateLocalTeam } from 'cache'
import { useGlobal, useStyles, useToaster } from 'hooks'

import styles from 'styles/TeamBuilder.module.css'

import { deleteTeam, getTeam, publishTeam, renameTeam } from 'services'
import {
  ArrowMoreIcon,
  CheckmarkIcon,
  NetworkIcon,
  XMarkIcon
} from 'assets/icons'

const buildSpectrum = data => {
  if (!data) return null
  const tmp = Object.entries(data).filter(([_, v]) => v > 0)
  if (tmp.length === 0) return null
  const [_, max] = tmp.reduce((max, [_, v]) => (v > max ? v : max))
  return tmp.map(([k, v]) => [k, v / max])
}

const meterState = score => {
  if (score < 0.2) return 'low'
  if (score < 0.6) return 'medium'
  if (score < 0.9) return 'high'
  return 'max'
}

const Summary = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { showError, showInfo, showSuccess } = useToaster()
  const { initialized, authenticated, pokedex, getPokemon } = useGlobal()

  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'TeamBuilder.Summary' })

  const [summary, setSummary] = useState(null)
  const [n, setN] = useState(0)
  const [name, setName] = useState('')
  const [localId, setLocalId] = useState(null)

  const team = summary?.team.pokemons
  const enemies = summary?.facts
  const alts = summary?.alternatives
  const spectrum = buildSpectrum(
    Array.isArray(summary?.spectrum) ? summary?.spectrum[0] : summary?.spectrum
  )

  useEffect(() => {
    if (!initialized) return
    if (!authenticated) {
      const {
        groups: { index }
      } = id.match(/local-(?<index>\d+)/i)
      setLocalId(index)
      const data = JSON.parse(getCache('localTeams'))[index]
      console.log(data)
      setSummary(data)
      setName(data.name)
      setN(Math.max(data.team.pokemons.length, data.facts.length))
      return
    }

    getTeam(id).then(({ data }) => {
      setSummary(data)
      setName(data.name)
      setN(Math.max(data.team.pokemons.length, data.facts.length))
    })
  }, [initialized, authenticated, setSummary, setName, setN, setLocalId])

  if (!initialized) {
    return <></>
  }

  if (summary == null || !pokedex) {
    return (
      <main className={s('empty', 'card main flow')}>
        <p className={s('empty-text')}>{t('TextLoading')}</p>
      </main>
    )
  }

  return (
    <main className='card main flow'>
      <header>
        <p className='link'>
          <Link to='/teams'>{t('LinkTeamList')}</Link>
        </p>
        <div className={s('summary-header')}>
          <label>
            <input
              type='text'
              className={s('team-name')}
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </label>
          <div className={s('summary-controls')}>
            {name !== summary.name && (
              <button
                className={s(
                  `action save-icon ${team.public && 'active'}`,
                  'icon-btn md'
                )}
                onClick={() => {
                  if (localId) {
                    const data = updateLocalTeam(localId, name)
                    if (data) {
                      setSummary(data)
                      showSuccess(t('SuccessNameUpdate'))
                    }
                    return
                  }
                  renameTeam(summary._id, name)
                    .then(({ data }) => {
                      setSummary(data)
                      showSuccess(t('SuccessNameUpdate'))
                    })
                    .catch(err => {
                      showError(err.message)
                    })
                }}
              >
                <CheckmarkIcon />
              </button>
            )}
            {!localId && (
              <button
                className={s(
                  `action share-icon ${summary.public && 'active'}`,
                  'icon-btn md'
                )}
                onClick={() => {
                  publishTeam(summary._id)
                    .then(({ data }) => {
                      console.log(data)
                      setSummary(data)
                    })
                    .catch(err => {
                      showError(err.message)
                    })
                }}
              >
                <NetworkIcon />
              </button>
            )}
            <button
              className={s('action delete-icon', 'icon-btn md')}
              onClick={() => {
                if (localId != null) {
                  removeLocalTeam(localId)
                  showInfo(t('InfoTeamDeleted'))
                  navigate('/teams')
                  return
                }

                deleteTeam(summary._id)
                  .then(() => {
                    showInfo(t('InfoTeamDeleted'))
                    navigate('/teams')
                  })
                  .catch(err => {
                    showError(err.message)
                  })
              }}
            >
              <XMarkIcon />
            </button>
          </div>
        </div>
      </header>
      <section>
        {[...Array(n)].map((_, i) => (
          <div className={s('decision-row')} key={i}>
            <div className={s('decision-counter')}>
              <div>
                {team[i] ? (
                  <img
                    src={pokedex[team[i]?._id ?? team[i]].sprites[0]}
                    alt={pokedex[team[i]?._id ?? team[i]].name}
                    title={pokedex[team[i]?._id ?? team[i]].name}
                    className={s('portrait-lg')}
                  />
                ) : (
                  'nothing?'
                )}
              </div>
              <p className={s('defeats')}>{t('TextDefeats')}</p>
              <div>
                {enemies[i] ? (
                  <img
                    src={pokedex[enemies[i]._id].sprites[0]}
                    alt={pokedex[enemies[i]._id].name}
                    title={pokedex[enemies[i]._id].name}
                    className={s('portrait-lg')}
                  />
                ) : (
                  'nothing?'
                )}
              </div>
            </div>
            {alts[i].length > 0 && (
              <div className={s('alts')}>
                <h3 className={s('alt-heading')}>{t('HeadingAlternatives')}</h3>
                <div className={s('alt-list')}>
                  {alts[i].map((name, idx) => {
                    const {
                      sprites: [img]
                    } = getPokemon(name)
                    return (
                      <img
                        src={img}
                        alt={name}
                        title={name}
                        className={s('portrait-sm')}
                        key={idx}
                      />
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </section>
      {spectrum?.length > 0 && (
        <section className={s('spectrum')}>
          <h3>{t('HeadingSpectrum')}</h3>
          <div className={s('spectrum-meters')}>
            {spectrum.map(([type, score]) => (
              <div className={s('spectrum-type')} key={type}>
                <p>{type}</p>
                <div className={s('meter-frame')}>
                  <div
                    className={s(`meter ${meterState(score)}`)}
                    style={{ '--meter-score': score }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default Summary
