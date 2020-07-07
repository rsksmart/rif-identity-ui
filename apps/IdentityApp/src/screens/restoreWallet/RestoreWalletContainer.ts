import {connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';
import RestoreWalletComponent from './RestoreWalletComponent';

// const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = () => ({
  onSubmit: (navigation: NavigationScreenProp<any, any>) =>
    navigation.navigate('PinCreate'),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onSubmit: () => dispatchProps.onSubmit(ownProps.navigation),
});

export default connect(
  null,
  mapDispatchToProps,
  mergeProps,
)(RestoreWalletComponent);
