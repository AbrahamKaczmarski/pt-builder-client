import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useStyles } from 'hooks'

import styles from 'styles/TeamBuilder.module.css'
import { ArrowMoreIcon, NetworkIcon, XMarkIcon } from 'assets/icons'

import { pokedex } from 'mockup'

const TeamListRow = ({ team, editable }) => {
  const navigate = useNavigate()

  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'TeamBuilder.TeamListRow' })

  return (
    <li className={s('team-list-row')}>
      <p className={s('cell col-name', 'col')}>{team.name}</p>
      <p className={s('cell col-date', 'col')}>{team.created}</p>
      <p className={s('cell col-team', 'col')}>
        {team.picks.map((pokemon, idx) => (
          <img
            src={pokedex[pokemon]}
            alt={pokemon}
            className={s('portrait')}
            key={idx}
          />
        ))}
      </p>
      <p className={s('cell col-enemies', 'col')}>
        {team.enemies.map((pokemon, idx) => (
          <img
            src={pokedex[pokemon]}
            alt={pokemon}
            className={s('portrait')}
            key={idx}
          />
        ))}
      </p>
      <p className={s('cell col-actions', 'col')}>
        <button
          className={s('action more-icon', 'icon-btn md')}
          onClick={() => navigate(`/team/${team.name}`)}>
          <ArrowMoreIcon />
        </button>
        {editable && (
          <>
            <button
              className={s(
                `action share-icon ${team.public && 'active'}`,
                'icon-btn md'
              )}>
              <NetworkIcon />
            </button>
            <button className={s('action delete-icon', 'icon-btn md')}>
              <XMarkIcon />
            </button>
          </>
        )}
      </p>
    </li>
  )
}

export default TeamListRow
