export interface User {
  email: string;
  profilePicture: string;
  board: {},
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}

export interface UpdateUserApiData {
  user?: User;
  error?: { message: string };
}
