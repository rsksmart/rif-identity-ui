import {connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';
import CredentialsHomeComponent from '../components/CredentialsHomeComponent';

// const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = () => ({
  /*
  onSubmit: (navigation: NavigationScreenProp<any, any>) => {
    console.log('lets go home!');
    navigation.navigate('Home');
  },
  */
  onSubmit: (navigation: NavigationScreenProp<any, any>) =>
    navigation.navigate('Home'),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  startOverPress: () => dispatchProps.onSubmit(ownProps.navigation),
});

export default connect(
  null,
  mapDispatchToProps,
  mergeProps,
)(CredentialsHomeComponent);
