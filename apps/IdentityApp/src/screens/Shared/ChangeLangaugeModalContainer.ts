import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { changeLanguage } from 'redux-multilanguage';
import ChangeLanguageModal from './ChangeLangaugeModal';
import { RootState } from '../../state/store';

interface dispatchInterface {
  restoreButtonPress: (path: string) => any;
  getStartedPress: (path: string) => any;
}

const mapStateToProps = (state: RootState) => ({
  selectedLanguage: state.multilanguage.currentLanguageCode,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeLanguage: (languageCode: string) => {
    console.log('changing lang', languageCode);
    dispatch(changeLanguage(languageCode));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLanguageModal);
