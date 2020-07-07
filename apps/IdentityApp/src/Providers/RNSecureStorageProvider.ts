/**
 * Provider for RN-Secure-Storage
 */
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

const set = async (key: string, value: string) => {
  await RNSecureStorage.set(key, value, {
    accessible: ACCESSIBLE.WHEN_UNLOCKED,
  }).then(
    (res: any) => {
      console.log('value set', res);
      return value;
    },
    (err: any) => {
      console.log(err);
    },
  );
};

const get = async (key: string) => {
  return await RNSecureStorage.get(key);
};

export default {get, set};
