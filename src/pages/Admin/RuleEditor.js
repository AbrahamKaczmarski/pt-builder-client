import { useTranslation } from 'react-i18next'

import { useStyles, useToaster } from 'hooks'

import styles from 'styles/Admin.module.css'

import { ruleParams } from 'mockup'
import { XMarkIcon } from 'assets/icons'
import { useEffect, useState } from 'react'
import { getRuleParams } from 'services'

const RuleEditor = () => {
  const { showSuccess } = useToaster()
  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'Admin.RuleEditor' })

  const [rules, setRules] = useState([])

  useEffect(() => {
    getRuleParams().then(({ data }) => {
      setRules(data)
    })
  }, [])

  return (
    <main className='card main flow'>
      {rules.map(rule => (
        <>
          <h2>{rule.name}</h2>
          <section className='flow'>
            {Object.entries(rule.value).map(([type, counters]) => (
              <div className={s('param')}>
                <div className={s('param-controls')}>
                  <p className={s('param-key')}>{type}</p>
                  <input type='text' className={s('input')} />
                  <button className='btn sm secondary'>{t('ButtonAdd')}</button>
                </div>
                <div className={s('param-values')}>
                  {counters.map(type => (
                    <p className={s('label')}>
                      <span className={s('param-value')}>{type}</span>
                      <button className='icon-btn'>
                        <XMarkIcon />
                      </button>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </>
      ))}
      <section className={s('controls')}>
        <button
          className='btn primary'
          onClick={() => showSuccess(t('SuccessChangesSaved'))}
        >
          {t('ButtonSave')}
        </button>
      </section>
    </main>
  )
}

export default RuleEditor
