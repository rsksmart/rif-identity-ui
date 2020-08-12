import { connect } from 'react-redux';
import { Dispatch } from 'react';
import ViewMnemonicComponent from '../components/ViewMnemonicComponent';
import { RootState } from '../../../state/store';
import * as RootNavigation from '../../../AppNavigation';
import { generateNewMnemonic } from '../operations';

const mapStateToProps = (state: RootState) => ({
  mnemonic: state.identity.newMnemonic,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  generateNewMnemonic: () => dispatch(generateNewMnemonic()),
  onSubmit: () => RootNavigation.navigate('MnemonicConfirm', {}),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewMnemonicComponent);
