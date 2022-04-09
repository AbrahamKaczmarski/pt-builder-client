import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationsEn from './en.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationsEn }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})
