export interface User {
  email: string;
  username: string;
  profilePicture: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
