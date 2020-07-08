import { createMultilanguageReducer } from 'redux-multilanguage';
import en from '../Languages/en.json';
import es from '../Languages/es_uy.json';

const currentLanguageCode = 'en';
const languages = {
  en, es,
};

export default createMultilanguageReducer({ currentLanguageCode, languages });
