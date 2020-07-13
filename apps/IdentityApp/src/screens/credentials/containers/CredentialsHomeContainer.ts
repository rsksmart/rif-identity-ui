import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import CredentialsHomeComponent from '../components/CredentialsHomeComponent';
// import { RootState } from '../../../state/store';
import { signOutAndReset } from '../operations';

// const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startOverPress: () => dispatch(signOutAndReset()),
});

export default connect(null, mapDispatchToProps)(CredentialsHomeComponent);
