import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ConfirmComponent from '../components/ConfirmComponent';
import { RootState } from '../../../state/store';
import { sendRequestToServer } from '../../credentialsView/operations';
import * as RootNavigation from '../../../AppNavigation';

const mapStateToProps = (state: RootState) => ({
  declarativeDetails: state.declarativeDetails,
  did: state.identity.identities[0],
  authentication: state.authentication,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  requestCredential: (metadata: any, did: string, serviceToken: string | undefined) => 
    new Promise((resolve, reject) => {
      const callback = (err: Error) => {
        if (err) {
          console.log('[ConfirmContainer.ts] err: ', err);
          return reject(err);
        }

        resolve(
          RootNavigation.navigate('CredentialsFlow', {
            screen: 'CredentialsHome',
          }),
        );
      };
      dispatch(sendRequestToServer(did, metadata, serviceToken, callback));
    }),
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
  requestCredential: (metadata: {}) =>
    dispatchProps.requestCredential(
      metadata,
      stateProps.did,
      stateProps.authentication[stateProps.did] || undefined,
    ),
  profile: stateProps.declarativeDetails[stateProps.did] || [],
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ConfirmComponent);
