// TODO: Move this reducer to a shared place so it can be reused

import { createMultilanguageReducer } from 'redux-multilanguage';
import en from '../languages/en.json';
import es from '../languages/es_uy.json';

const currentLanguageCode = 'en';
export const languages = {
  en,
  es,
};

export default createMultilanguageReducer({ currentLanguageCode, languages });
