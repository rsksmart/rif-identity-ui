import { connect } from 'react-redux';
import { Dispatch } from 'react';
import ViewMnemonicComponent from '../components/ViewMnemonicComponent';
import { RootState } from '../../../state/store';
import * as RootNavigation from '../../../AppNavigation';
import { generateNewMnemonic } from '../operations';

const mapStateToProps = (state: RootState) => ({
  currentLanguage: state.multilanguage.currentLanguageCode,
  mnemonic: state.identity.newMnemonic,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  generateNewMnemonic: (language: string) => dispatch(generateNewMnemonic(language)),
  onSubmit: () => RootNavigation.navigate('MnemonicConfirm', {}),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  generateNewMnemonic: () => dispatchProps.generateNewMnemonic(stateProps.currentLanguage),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ViewMnemonicComponent);
