import { Fragment, useEffect, useReducer, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useGlobal, useStyles, useToaster } from 'hooks'
import { getRuleParams, updateRule } from 'services'
import { deepEqual } from 'utils'

import styles from 'styles/Admin.module.css'

import { XMarkIcon } from 'assets/icons'

const cloneRules = data =>
  data.map(({ value, ...rest }) => ({
    value: Object.entries(value).reduce(
      (obj, [type, counters]) => ({ ...obj, [type]: [...counters] }),
      {}
    ),
    ...rest
  }))

export const ACTIONS = {
  ADD_PARAM: 'ADD_PARAM',
  ADD_VALUE: 'ADD_VALUE',
  INIT: 'INIT',
  REMOVE_PARAM: 'REMOVE_PARAM',
  REMOVE_VALUE: 'REMOVE_VALUE'
}

const reducer = (state, { action, payload }) => {
  switch (action) {
    case ACTIONS.INIT:
      return payload
    case ACTIONS.ADD_VALUE: {
      const oldParam = state[payload.rule].value[payload.param]
      if (oldParam.includes(payload.value)) {
        return state
      }
      state[payload.rule].value[payload.param] = [...oldParam, payload.value]
      return [...state]
    }
    case ACTIONS.REMOVE_VALUE: {
      const newParam = state[payload.rule].value[payload.param].filter(
        value => value !== payload.value
      )
      state[payload.rule].value[payload.param] = newParam
      return [...state]
    }
    case ACTIONS.ADD_PARAM: {
      if (payload.param in state[payload.rule].value) {
        return state
      }
      state[payload.rule].value[payload.param] = []
      return [...state]
    }
    case ACTIONS.REMOVE_PARAM: {
      delete state[payload.rule].value[payload.param]
      return [...state]
    }
    default:
      return state
  }
}

const RuleEditor = () => {
  const navigate = useNavigate()

  const { showSuccess, showError, showInfo } = useToaster()
  const { initialized, authenticated, user } = useGlobal()

  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'Admin.RuleEditor' })

  const [state, setState] = useState([])
  const [rules, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    if (!initialized) return
    if (!authenticated || !user?.roles.includes('admin')) {
      navigate('/')
      return
    }

    getRuleParams().then(({ data }) => {
      dispatch({ action: ACTIONS.INIT, payload: data })
      const dataCopy = cloneRules(data)
      setState(dataCopy)
    })
  }, [initialized, authenticated, user, setState, dispatch])

  if (!initialized | !authenticated | !user?.roles.includes('admin')) {
    return <></>
  }

  return (
    <main className='card main flow'>
      {rules.map((rule, ruleIdx) => (
        <Fragment key={rule.name}>
          <h2>{rule.name}</h2>
          <section className='flow'>
            {Object.entries(rule.value).map(([type, counters], idx) => (
              <div className={s('param')} key={idx}>
                <div className={s('param-controls')}>
                  <div className={s('param-key')}>
                    <p>{type}</p>
                    <button
                      className='icon-btn'
                      onClick={({ target }) => {
                        const input = target.previousSibling
                        if (input?.innerText?.length > 0) {
                          dispatch({
                            action: ACTIONS.REMOVE_PARAM,
                            payload: {
                              rule: ruleIdx,
                              param: type
                            }
                          })
                        }
                      }}
                    >
                      <XMarkIcon />
                    </button>
                  </div>
                  <div>
                    <input type='text' className={s('input')} />
                    <button
                      className='btn sm secondary'
                      onClick={({ target }) => {
                        const input = target.previousSibling
                        if (input?.value?.length > 0) {
                          dispatch({
                            action: ACTIONS.ADD_VALUE,
                            payload: {
                              rule: ruleIdx,
                              param: type,
                              value: input.value
                            }
                          })
                          input.value = ''
                        }
                      }}
                    >
                      {t('ButtonAdd')}
                    </button>
                  </div>
                </div>
                <div className={s('param-values')}>
                  {counters.map((counter, idx) => (
                    <p className={s('label')} key={idx}>
                      <span className={s('param-value')}>{counter}</span>
                      <button
                        className='icon-btn'
                        onClick={({ target }) => {
                          const input = target.previousSibling
                          if (input?.innerText?.length > 0) {
                            dispatch({
                              action: ACTIONS.REMOVE_VALUE,
                              payload: {
                                rule: ruleIdx,
                                param: type,
                                value: input.innerText
                              }
                            })
                          }
                        }}
                      >
                        <XMarkIcon />
                      </button>
                    </p>
                  ))}
                </div>
              </div>
            ))}
            <div className={s('add-param')}>
              <input type='text' className={s('input')} />
              <button
                className='btn sm secondary'
                onClick={({ target }) => {
                  const input = target.previousSibling
                  if (input?.value?.length > 0) {
                    dispatch({
                      action: ACTIONS.ADD_PARAM,
                      payload: {
                        rule: ruleIdx,
                        param: input.value
                      }
                    })
                    input.value = ''
                  }
                }}
              >
                {t('ButtonAddParam')}
              </button>
            </div>
          </section>
        </Fragment>
      ))}
      {!deepEqual(state, rules) && (
        <div className={s('persistance-controls')}>
          <button
            className='btn'
            onClick={() => {
              dispatch({ action: ACTIONS.INIT, payload: cloneRules(state) })
              showInfo(t('InfoRulesReset'))
            }}
          >
            {t('ButtonReset')}
          </button>
          <button
            className='btn primary'
            onClick={() => {
              Promise.all(rules.map(rule => updateRule(rule._id, rule)))
                .then(() => {
                  setState(cloneRules(rules))
                  showSuccess(t('SuccessChangesSaved'))
                })
                .catch(err => {
                  showError(err.message)
                })
            }}
          >
            {t('ButtonSaveChanges')}
          </button>
        </div>
      )}
    </main>
  )
}

export default RuleEditor
