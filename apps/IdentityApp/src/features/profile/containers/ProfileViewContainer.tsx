import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ProfileViewComponent from '../components/ProfileViewComponent';
import { RootState } from '../../../state/store';
import { toggleEdit } from '../actions';
import { isEmpty } from '../operations';

const mapStateToProps = (state: RootState) => ({
  profile: state.profile.profile,
  isEmpty: isEmpty(state.profile.profile),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleEdit: () => dispatch(toggleEdit(true)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileViewComponent);
