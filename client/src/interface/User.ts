export interface User {
  email: string;
  username: string;
  profilePicture: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}

export interface UpdateUserApiData {
  user?: User;
  error?: { message: string };
}