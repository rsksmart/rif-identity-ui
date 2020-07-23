import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ValidPresentationContainer from '../components/ValidPresentationComponent';
import { RootState } from '../../../state/store';

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ValidPresentationContainer);