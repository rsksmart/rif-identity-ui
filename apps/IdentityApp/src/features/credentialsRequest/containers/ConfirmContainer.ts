import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ConfirmComponent from '../components/ConfirmComponent';
import { RootState } from '../../../state/store';
import { sendRequestToServer } from '../../credentialsView/operations';
import * as RootNavigation from '../../../AppNavigation';
import { serverInterface } from '../../../Providers/Issuers';
import { getEndpoint } from '../../../Providers/Endpoints';

const mapStateToProps = (state: RootState) => ({
  credentials: state.credentials.credentials,
  profile: state.profile.profile,
  did: state.identity.did,
  isRequestingCredential: state.credentials.isRequestingCredential,
  requestCredentialError: state.credentials.requestCredentialError,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  requestCredential: async (metadata: any, did: string) => {
    getEndpoint('issuer').then((endpoint: string) => {
      const server: serverInterface = {
        name: 'Credential Server',
        endpoint: endpoint,
      };
      dispatch(sendRequestToServer(server, did, metadata));
    });
  },
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
