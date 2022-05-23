import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useGlobal, useStyles, useToaster } from 'hooks'

import styles from 'styles/TeamBuilder.module.css'
import { ArrowMoreIcon, NetworkIcon, XMarkIcon } from 'assets/icons'

import { useEffect } from 'react'
import { deleteTeam } from 'services'

const TeamListRow = ({ team, editable, onDelete }) => {
  const navigate = useNavigate()
  const { pokedex } = useGlobal()
  const { showError, showInfo } = useToaster()

  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'TeamBuilder.TeamListRow' })

  // useEffect(() => {
  //   console.log(pokedex)
  //   console.log(team)
  // }, [pokedex, team])

  return (
    <li className={s('team-list-row')}>
      <p className={s('cell col-name', 'col')}>{team.name}</p>
      <p className={s('cell col-date', 'col')}>{team.date}</p>
      <p className={s('cell col-team', 'col')}>
        {team.team.pokemons?.map(({ _id: pokemon }, idx) => (
          <img
            src={pokedex[pokemon].sprites[0]}
            alt={pokedex[pokemon].name}
            className={s('portrait')}
            key={idx}
          />
        ))}
      </p>
      <p className={s('cell col-enemies', 'col')}>
        {team.facts?.map(({ _id: pokemon }, idx) => (
          <img
            src={pokedex[pokemon].sprites[0]}
            alt={pokedex[pokemon].name}
            className={s('portrait')}
            key={idx}
          />
        ))}
      </p>
      <p className={s('cell col-actions', 'col')}>
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
    </li>
  )
}

export default TeamListRow
