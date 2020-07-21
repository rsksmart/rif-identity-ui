import { connect } from 'react-redux';
// import { Dispatch } from 'redux';
import { DetailsComponent } from '../components';
import { RootState } from '../../../state/store';
import { Credential } from '../reducer';

const mapStateToProps = (state: RootState) => ({
  allCredentials: state.credentials.credentials,
});

// const mapDispatchToProps = (dispatch: Dispatch) => ({});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  credential: stateProps.allCredentials.filter(
    (item: Credential) => item.hash === ownProps.route.params.credentialHash,
  )[0],
});

export default connect(mapStateToProps, null, mergeProps)(DetailsComponent);
