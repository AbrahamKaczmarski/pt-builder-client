import { useTranslation } from 'react-i18next'

import { setCache } from 'cache'
import { useStyles } from 'hooks'

import styles from 'styles/App.module.css'

const Footer = () => {
  const s = useStyles(styles)

  const { i18n } = useTranslation()

  return (
    <div className={s('footer')}>
      <div className={s('authors')}>
        <p>Anna Justyna Kuczyńska</p>
        <p>Abraham Kaczmarski</p>
        <p>Łukasz Karwowski</p>
        <p>Marek Korzeniewski</p>
      </div>
      <div className={s('language')}>
        <button
          className={s('lng-btn')}
          data-status={i18n.language === 'pl' && 'active'}
          onClick={() => {
            i18n.changeLanguage('pl')
            setCache('pl', 'lng')
          }}
        >
          PL
        </button>
        <button
          className={s('lng-btn')}
          data-status={i18n.language === 'en' && 'active'}
          onClick={() => {
            i18n.changeLanguage('en')
            setCache('en', 'lng')
          }}
        >
          EN
        </button>
      </div>
    </div>
  )
}

export default Footer
