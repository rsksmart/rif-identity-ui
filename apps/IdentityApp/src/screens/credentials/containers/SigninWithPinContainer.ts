import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import SigninWithPinComponent from '../components/SigninWithPinComponent';
import { checkPinAndSignIn } from '../operations';
import { RootState } from '../../../state/store';

const mapStateToProps = (state: RootState) => ({
  errorMessage: state.localUi.loginError,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (userPin: string) => dispatch(checkPinAndSignIn(userPin)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SigninWithPinComponent);
