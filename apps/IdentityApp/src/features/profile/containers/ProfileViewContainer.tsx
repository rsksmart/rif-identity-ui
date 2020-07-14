import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ProfileViewComponent from '../components/ProfileViewComponent';
import { RootState } from '../../../state/store';
import { toggleEdit } from '../actions';

const mapStateToProps = (state: RootState) => ({
  fullName: state.profile.profile.fullName,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleEdit: () => dispatch(toggleEdit(true)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileViewComponent);
