import { createMultilanguageReducer } from 'redux-multilanguage';
import en from '../Languages/en.json';
import es from '../Languages/es.json';

const currentLanguageCode = 'en';
export const languages = {
  en,
  es,
};

export default createMultilanguageReducer({ currentLanguageCode, languages });
