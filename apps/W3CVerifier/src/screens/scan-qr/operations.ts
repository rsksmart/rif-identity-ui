import { Dispatch } from 'react';
import { requestVerifyJwt, receiveValidJwt, receiveInvalidJwt } from './actions';
import { Resolver } from 'did-resolver'
import { getResolver } from 'ethr-did-resolver'
import { verifyPresentation } from 'did-jwt-vc'

export const RPC_URL = 'https://mainnet.infura.io/v3/1e0af90f0e934c88b0f0b6612146e07a';

// https://github.com/uport-project/ethr-did-registry
export const DID_REGISTRY_ADDRESS = '0xdca7ef03e98e0dc2b855be647c39abe984fcf21b';

const providerConfig = {
  rpcUrl: RPC_URL,
  registry: DID_REGISTRY_ADDRESS,
}
const resolver = new Resolver(getResolver(providerConfig));

export const scanQR = (jwt: string, navigation: any) => async (dispatch: Dispatch) => {
  dispatch(requestVerifyJwt())
  console.log(jwt)
  verifyPresentation(jwt, resolver)
    .then((vp) => {
      console.log('valid')

      navigation.navigate('PresentationNavigation', { screen: 'Valid' });
      dispatch(receiveValidJwt(vp))
    })
    .catch((err) => {
      console.log('invalid')
      console.log(err)

      navigation.navigate('PresentationNavigation', { screen: 'Invalid' });
      dispatch(receiveInvalidJwt())
    })
}
