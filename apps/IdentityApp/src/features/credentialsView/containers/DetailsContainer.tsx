import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DetailsComponent } from '../components';
import { RootState } from '../../../state/store';


const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsComponent);