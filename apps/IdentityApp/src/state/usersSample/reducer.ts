import {UserListState, UserListAction, User} from './types';
import {USER_LIST_ACTION_TYPES} from './actions';

const person: User = {
  name: "jesse",
  age: 36,
  surname: "clark",
}

export const initialState: UserListState = [person];

const reducer = (
  state: UserListState = initialState,
  action: UserListAction
) => {
  switch (action.type) {
    case USER_LIST_ACTION_TYPES.ADD_USER:
      return state;
      // return [...state, { action.name, action.surename, action.age }];
    default:
      return state;
  }
};

export default reducer;
