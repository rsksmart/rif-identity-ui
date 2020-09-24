import { Dispatch } from 'react';
import { changeLanguage } from 'redux-multilanguage';
import * as RootNavigation from '../AppNavigation';
import { StorageProvider, STORAGE_KEYS } from '../providers';
import { 
  requestScannedPresentations, receiveScannedPresentations,
  receiveEmptyScannedPresentations
} from '../features/scanned-presentations-list/actions';
import { CONVEY_URL, CONVEY_DID } from '../../env.json'
import { serviceAuthenticationFactory } from 'je-id-core/lib/operations/authentication';
import { initIdentityFactory } from 'je-id-core/lib/operations/identity'
import { createIdentityFactory } from 'je-id-core/lib/operations/identity'
import { agent } from '../daf/dafSetup';
import { AbstractIdentity } from 'daf-core'
import { errorConveyLogin, receiveConveyLogin, requestConveyLogin } from './localUi/actions';

export const conveyLogin = (identity: AbstractIdentity) => async (dispatch: Dispatch) => {
  const loginToConveyService = serviceAuthenticationFactory(agent);
  dispatch(loginToConveyService(
    CONVEY_URL, CONVEY_DID, identity!.did, (err) => {
      if (!err) dispatch(receiveConveyLogin())
      else dispatch(errorConveyLogin(err))
    }
  ));
}

export const initialAppStart = () => async (dispatch: Dispatch) => {
  dispatch(requestScannedPresentations());

  if (CONVEY_DID && CONVEY_URL) {
    dispatch(requestConveyLogin());

    // if the identity has been created, do convey login
    // if not, create identity and then do convey login
    const initIdentity = initIdentityFactory(agent);
    dispatch(initIdentity((error, identities) => {
      if (identities && !error) {
        if (identities.length) {
          dispatch(conveyLogin(identities[0]))
        } else {
          const createIdentity = createIdentityFactory(agent);
          dispatch(createIdentity((err, identity) => {
            if (!err && identity) dispatch(conveyLogin(identity))
            else dispatch(errorConveyLogin(err!))
          }))
        }
      } else dispatch(errorConveyLogin(error!))
    }));
  }

  await StorageProvider.get(STORAGE_KEYS.SCANNED_CREDENTIALS)
    .then(presentations => {
      dispatch(receiveScannedPresentations(JSON.parse(presentations!)));
    })
    .catch(() => {
      dispatch(receiveEmptyScannedPresentations());
    })

  RootNavigation.navigate('MainFlow', { screen: 'PresentationNavigation' });

  await StorageProvider.get('LANGUAGE')
    .then(res => dispatch(changeLanguage(res)))
    .catch(() => dispatch(changeLanguage('en')));
};
