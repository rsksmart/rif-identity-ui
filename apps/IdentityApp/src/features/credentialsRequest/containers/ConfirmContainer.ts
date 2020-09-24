import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ConfirmComponent from '../components/ConfirmComponent';
import { RootState } from '../../../state/store';
import { sendRequestToServer } from '../../credentialsView/operations';
import * as RootNavigation from '../../../AppNavigation';

const mapStateToProps = (state: RootState) => ({
  declarativeDetails: state.declarativeDetails,
  did: state.identity.identities[0],

  requestCredentialError: null, //@TODO state.credentials.requestCredentialError,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  requestCredential: (metadata: any, did: string) => {
    const callback = (err: Error) => {
      if (err) {
        //@TODO HANDLE THIS ERROR!
      }

      RootNavigation.navigate('CredentialsFlow', {
        screen: 'CredentialsHome',
      });
    };

    dispatch(sendRequestToServer(did, metadata, callback));
  },
  handleEditProfile: () =>
    RootNavigation.navigate('CredentialsFlow', {
      screen: 'Profile',
      params: { screen: 'Edit' },
    }),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  requestCredential: (metadata: {}) => dispatchProps.requestCredential(metadata, stateProps.did),
  profile: stateProps.declarativeDetails[stateProps.did] || [],
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ConfirmComponent);
