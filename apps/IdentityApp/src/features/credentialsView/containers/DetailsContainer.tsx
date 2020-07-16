import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DetailsComponent } from '../components';
import { RootState } from '../../../state/store';

const mapStateToProps = (state: RootState) => ({
  allCredentials: state.credentials.credentials,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  credential: stateProps.allCredentials.filter(item => item.id === ownProps.route.params.credentialId)[0]
});

export default connect(mapStateToProps, null, mergeProps)(DetailsComponent);
