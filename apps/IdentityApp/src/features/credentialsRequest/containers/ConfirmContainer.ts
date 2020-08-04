import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import ConfirmComponent from '../components/ConfirmComponent';
import { RootState } from '../../../state/store';
import { sendRequestToServer } from '../../credentialsView/operations';
import { ISSUERS } from '../../../Providers';
import * as RootNavigation from '../../../AppNavigation';

const mapStateToProps = (state: RootState) => ({
  credentials: state.credentials.credentials,
  profile: state.profile.profile,
  did: state.localUi.did,
  isRequestingCredential: state.credentials.isRequestingCredential,
  requestCredentialError: state.credentials.requestCredentialError,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  requestCredential: (metadata, did: string) =>
    dispatch(sendRequestToServer(ISSUERS[0], did, metadata)),
  handleEditProfile: () =>
    RootNavigation.navigate('CredentialsFlow', {
      screen: 'Profile',
      params: { screen: 'Edit', params: { previousScreen: 'ConfirmCredential' } },
    }),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  requestCredential: (metadata: {}) => dispatchProps.requestCredential(metadata, stateProps.did),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ConfirmComponent);
