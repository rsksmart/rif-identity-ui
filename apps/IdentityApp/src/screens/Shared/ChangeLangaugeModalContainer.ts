import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { changeLanguage } from 'redux-multilanguage';
import ChangeLanguageModal from './ChangeLangaugeModal';
import { RootState } from '../../state/store';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';

const mapStateToProps = (state: RootState) => ({
  selectedLanguage: state.multilanguage.currentLanguageCode,
  languages: Object.keys(state.multilanguage.languages),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeLanguage: async (languageCode: string) => {
    dispatch(changeLanguage(languageCode));
    await StorageProvider.set(STORAGE_KEYS.LANGUAGE, languageCode);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLanguageModal);
