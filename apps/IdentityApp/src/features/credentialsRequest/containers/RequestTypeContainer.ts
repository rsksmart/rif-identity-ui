import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RequestTypeComponent from '../components/RequestTypeComponent';
import { initialStart as profileStart } from '../../profile/operations';
import { ISSUERS } from '../../../Providers';

const mapStateToProps = () => ({
  issuers: ISSUERS,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  start: () => dispatch(profileStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestTypeComponent);
