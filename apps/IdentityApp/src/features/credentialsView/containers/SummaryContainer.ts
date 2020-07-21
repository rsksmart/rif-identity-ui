import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SummaryComponent } from '../components';
import { RootState } from '../../../state/store';
import { Credential } from '../reducer';
import { checkStatusOfPendingCredentials } from '../operations';

const simpleCredentials = (credentials: Credential[]) => {
  return credentials.map((item: Credential) => {
    const { hash, status, type } = item;
    return { hash, status, type };
  });
};

const mapStateToProps = (state: RootState) => ({
  credentials: simpleCredentials(state.credentials.credentials),
  isCheckingPendingStatus: state.credentials.isCheckingPendingStatus,
  did: state.localUi.did,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkPending: (credentials: Credential[], did: string) =>
    dispatch(checkStatusOfPendingCredentials(credentials, did)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  checkPending: () => dispatchProps.checkPending(stateProps.credentials, stateProps.did),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SummaryComponent);
