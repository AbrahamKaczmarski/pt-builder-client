import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'

import translationsEn from './en.json'
import translationsPl from './pl.json'

import { getCache } from 'cache'

const defaultLng = getCache('lng') ?? 'en'

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationsEn },
      pl: { translation: translationsPl }
    },
    lng: defaultLng,
    fallbackLng: defaultLng,
    interpolation: { escapeValue: false }
  })
