import { connect } from 'react-redux';
import { RootState } from '../../../state/store';
import { Credential } from '../reducer';
import QRDetailsComponent from '../components/QRDetailsComponent';

const mapStateToProps = (state: RootState) => ({
  allCredentials: state.credentials.credentials,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  credential: stateProps.allCredentials.filter(
    (item: Credential) => item.id === ownProps.credentialId,
  )[0],
});

export default connect(mapStateToProps, null, mergeProps)(QRDetailsComponent);
