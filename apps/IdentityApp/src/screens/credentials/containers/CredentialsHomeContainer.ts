import {connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';
import CredentialsHomeComponent from '../components/CredentialsHomeComponent';
import {RootState} from '../../../state/store';

const mapStateToProps = (state: RootState) => ({
  state,
});

const mapDispatchToProps = () => ({
  onSubmit: (navigation: NavigationScreenProp<any, any>) =>
    navigation.navigate('WelcomeHome'),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  startOverPress: () => dispatchProps.onSubmit(ownProps.navigation),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(CredentialsHomeComponent);
