import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useGlobal, useStyles, useToaster } from 'hooks'

import styles from 'styles/TeamBuilder.module.css'
import { ArrowMoreIcon, NetworkIcon, XMarkIcon } from 'assets/icons'

import { deleteTeam, publishTeam } from 'services'

const TeamListRow = ({ team, editable, onDelete, onPublish }) => {
  const navigate = useNavigate()
  const { pokedex } = useGlobal()
  const { showError, showInfo } = useToaster()

  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'TeamBuilder.TeamListRow' })

  return (
    <li className={s('team-list-row')}>
      <header className={s('team-header')}>
        <div className={s('team-metadata')}>
          <p className={s('team-date')}>{team.date}</p>
          <h3 className={s('team-name')}>{team.name}</h3>
        </div>
        <p className={s('team-actions')}>
          <button
            className={s('action more-icon', 'icon-btn md')}
            onClick={() => navigate(`/team/${team._id}`)}
          >
            <ArrowMoreIcon />
          </button>
          {editable && (
            <>
              <button
                className={s(
                  `action share-icon ${team.public && 'active'}`,
                  'icon-btn md'
                )}
                onClick={() => {
                  publishTeam(team._id)
                    .then(() => {
                      onPublish()
                    })
                    .catch(err => {
                      showError(err.message)
                    })
                }}
              >
                <NetworkIcon />
              </button>
              <button
                className={s('action delete-icon', 'icon-btn md')}
                onClick={() => {
                  deleteTeam(team._id)
                    .then(() => {
                      onDelete()
                      showInfo(t('InfoTeamDeleted'))
                    })
                    .catch(err => {
                      showError(err.message)
                    })
                }}
              >
                <XMarkIcon />
              </button>
            </>
          )}
        </p>
      </header>
      <section className={s('team-pokemon')}>
        <div>
          <h4>{t('HeadingTeam')}</h4>
          <p className={s('team-picks')}>
            {team.team.pokemons?.map(({ _id: pokemon }, idx) => (
              <img
                src={pokedex[pokemon].sprites[0]}
                alt={pokedex[pokemon].name}
                title={pokedex[pokemon].name}
                className={s('portrait')}
                key={idx}
              />
            ))}
          </p>
        </div>
        <div>
          <h4>{t('HeadingEnemies')}</h4>
          <p className={s('team-enemies')}>
            {team.facts?.map(({ _id: pokemon }, idx) => (
              <img
                src={pokedex[pokemon].sprites[0]}
                alt={pokedex[pokemon].name}
                title={pokedex[pokemon].name}
                className={s('portrait')}
                key={idx}
              />
            ))}
          </p>
        </div>
      </section>
    </li>
  )
}

export default TeamListRow
