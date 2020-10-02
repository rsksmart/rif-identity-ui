import { connect } from 'react-redux';
import ProfileViewComponent from '../components/ProfileViewComponent';
import { RootState } from '../../../state/store';

const mapStateToProps = (state: RootState) => ({
  declarativeDetails: state.declarativeDetails,
  did: state.identity.identities[0],
  hasIdentity: state.identity.identities.length !== 0,
});

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  profile: stateProps.declarativeDetails[stateProps.did] || [],
  isEmpty: !stateProps.declarativeDetails[stateProps.did],
});

export default connect(mapStateToProps, null, mergeProps)(ProfileViewComponent);
