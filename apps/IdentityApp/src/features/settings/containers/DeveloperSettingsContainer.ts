import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../../state/store';
import DeveloperSettingsComponent from '../components/DeveloperSettingsComponent';
import { signOutAndReset, saveEndpointsToLocalStorage } from '../operations';
import { EndpointsInterface } from '../reducer';
import packageConfig from '../../../../package.json';

const mapStateToProps = (state: RootState) => ({
  endpoints: state.settings.endpoints,
  isSavingEndpoints: state.settings.isSavingEndpoints,
  version: packageConfig.version,
  did: state.identity.identities[0],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startOverPress: () => signOutAndReset(),
  saveEndpoints: (endPoints: EndpointsInterface) =>
    dispatch(saveEndpointsToLocalStorage(endPoints)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperSettingsComponent);
