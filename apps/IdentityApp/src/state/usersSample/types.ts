export type User = {
  name: string;
  surname: string;
  age: number;
}

export type UserListState = User[];

export type AddUserAction = {
  type: string;
  userData: User;
}

export type UpdateUserAction = {
  type: string;
  index: number;
  userData: User;
}

export type RemoveUserAction = {
  type: string;
  index: number;
}

export type UserListAction = AddUserAction | UpdateUserAction | RemoveUserAction;

export type AppState = {
  userList: UserListState,
}