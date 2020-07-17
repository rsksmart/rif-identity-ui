import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RequestTypeComponent from '../components/RequestTypeComponent';
import { initialStart as profileStart } from '../../profile/operations';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  start: () => dispatch(profileStart()),
});

export default connect(null, mapDispatchToProps)(RequestTypeComponent);
