import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; 
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { TRANSLATION_FILE_PATH } from '../src/utility/constants';

i18n
  .use(Backend).use(LanguageDetector).use(initReactI18next)
  .init({
    lng: 'pt',
    backend: {
      loadPath: TRANSLATION_FILE_PATH
    },
    fallbackLng: 'pt',
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    react: {
      wait: true
    }
  });
 
export default i18n;