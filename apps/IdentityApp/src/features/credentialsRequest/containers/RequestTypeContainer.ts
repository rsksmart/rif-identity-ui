import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RequestTypeComponent from '../components/RequestTypeComponent';
import { getProfileFromLocalStorage } from '../../profile/operations';
import { ISSUERS } from '../../../Providers';
import { RootState } from '../../../state/store';

const mapStateToProps = (state: RootState) => ({
  issuers: ISSUERS,
  profileIsLoaded: state.profile.isLoaded,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  start: () => dispatch(getProfileFromLocalStorage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestTypeComponent);
