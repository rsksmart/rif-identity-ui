import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RequestTypeComponent from '../components/RequestTypeComponent';
import { RootState } from '../../../state/store';

const mapStateToProps = (state: RootState) => ({
  types: state.request.allTypes,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(RequestTypeComponent);
