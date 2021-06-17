export interface User {
  email: string;
  profilePicture: string;
  board: {
    columns: { id: number; title: string; cards: { id: number; title: string; description: string }[] }[];
  };
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}

export interface UpdateUserApiData {
  user?: User;
  error?: { message: string };
}
