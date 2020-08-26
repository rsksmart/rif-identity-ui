/**
 * Provider for RN-Secure-Storage
 */
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

export enum STORAGE_KEYS {
  PIN = 'PIN',
  LANGUAGE = 'LANGUAGE',
  PROFILE = 'PROFILE',
  CREDENTIALS = 'CREDENTIALS',
  IDENTITY = 'IDENTITY',
  END_POINTS = 'END_POINTS',
}

const set = async (key: string, value: string) => {
  return await RNSecureStorage.set(key, value, {
    accessible: ACCESSIBLE.WHEN_UNLOCKED,
  });
};

const remove = async (key: string) => {
  return await RNSecureStorage.remove(key);
};

const get = async (key: string) => {
  return await RNSecureStorage.get(key);
};

const removeAll = async () => {
  Object.keys(STORAGE_KEYS).forEach(key => {
    remove(key).catch(() => {});
  });
};

export default { get, set, remove, removeAll };
