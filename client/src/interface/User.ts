import Board from './Board';

export interface User {
  email: string;
  profilePicture: string;
  boards?: Board[];
  boards_id?: string[];
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}

export interface UpdateUserApiData {
  user?: User;
  error?: { message: string };
}
