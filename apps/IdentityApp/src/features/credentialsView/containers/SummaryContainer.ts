import { connect } from 'react-redux';
import { SummaryComponent } from '../components';
import { RootState } from '../../../state/store';
import { Credential } from '../reducer';

const simpleCredentials = (credentials: Credential[]) => {
  return credentials.map((item: Credential) => {
    const { name, id, status, type } = item;
    return { name, id, status, type };
  });
};

const mapStateToProps = (state: RootState) => ({
  credentials: simpleCredentials(state.credentials.credentials),
});

export default connect(mapStateToProps)(SummaryComponent);
