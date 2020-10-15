import { connect } from 'react-redux';
import ViewMnemonicComponent from '../components/ViewMnemonicComponent';
import * as RootNavigation from '../../../AppNavigation';
import { generateMnemonic } from '@rsksmart/rif-id-mnemonic';

const mapDispatchToProps = () => ({
  newMnemonic: () => generateMnemonic(12).split(' '),
  onSubmit: (mnemonic: string[]) => RootNavigation.navigate('MnemonicConfirm', { mnemonic }),
});

export default connect(null, mapDispatchToProps)(ViewMnemonicComponent);
