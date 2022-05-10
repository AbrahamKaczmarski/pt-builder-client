import { useTranslation } from 'react-i18next'

import { useStyles, useToaster } from 'hooks'

import styles from 'styles/Admin.module.css'

import { ruleParams } from 'mockup'
import { XMarkIcon } from 'assets/icons'

const RuleEditor = () => {
  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'Admin.RuleEditor' })

  const { showSuccess } = useToaster()

  return (
    <main className='card main flow'>
      <h2>{t('HeadingRuleEditor')}</h2>
      <section className='flow'>
        <h3>{t('HeadingRulesStrong')}</h3>
        {Object.entries(ruleParams.rulesStrong).map(([type, counters]) => (
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
      <section>
        <h3 className='heading'>{t('HeadingRulesWeak')}</h3>
        {Object.entries(ruleParams.rulesWeak).map(([type, counters]) => (
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
      <section className={s('controls')}>
        <button
          className='btn primary'
          onClick={() => showSuccess(t('SuccessChangesSaved'))}>
          {t('ButtonSave')}
        </button>
      </section>
    </main>
  )
}

export default RuleEditor
