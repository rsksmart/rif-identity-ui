import {StorageProvider} from '../../Providers/index';

export const SavePinToPersistantStorage = (pin: string) => (dispatch) => {
  
  StorageProvider.set('PIN', pin);
};
