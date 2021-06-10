export interface User {
  email: string;
  profilePicture: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
