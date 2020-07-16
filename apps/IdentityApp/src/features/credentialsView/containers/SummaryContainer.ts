import { connect } from 'react-redux';
import { SummaryComponent } from '../components';
import { RootState } from '../../../state/store';

const mapStateToProps = (state: RootState) => ({
  credentials: state.credentials.credentials,
});

export default connect(mapStateToProps)(SummaryComponent);
