//
// THIS FILE IS NOT USED
//

import { AddUserAction } from './types';

export enum USER_LIST_ACTION_TYPES {
  ADD_USER = 'USER_LIST/ADD_USER',
  REMOVE_USER = 'USER_LIST/REMOVE_USER',
  UPDATE_USER = 'USER_LIST/UPDATE_USER'
}

export const addUser = (name: string, surname: string, age: number): AddUserAction => ({
  type: USER_LIST_ACTION_TYPES.ADD_USER,
  userData: {
      name,
      surname,
      age
  }
});