import { connect } from 'react-redux';
import RequestTypeComponent from '../components/RequestTypeComponent';
import { ISSUERS } from '../../../Providers';

const mapStateToProps = () => ({
  issuers: ISSUERS,
});

export default connect(mapStateToProps)(RequestTypeComponent);
