import { User } from '../interface/User';

const mockLoggedInUser: User = {
  email: 'mockLoggedInUser@gmail.com',
  profilePicture: 'https://robohash.org/mockLoggedInUser@gmail.com.png',
};

const mockOtherUser1: User = {
  email: 'mockTestUser1@gmail.com',
  profilePicture: 'https://robohash.org/mockTestUser1@gmail.com.png',
};
const mockOtherUser2: User = {
  email: 'mockTestUser2@gmail.com',
  profilePicture: 'https://robohash.org/mockTestUser2@gmail.com.png',
};
const mockOtherUser3: User = {
  email: 'mockTestUser3@gmail.com',
  profilePicture: 'https://robohash.org/mockTestUser3@gmail.com.png',
};

const mockOtherUsers: User[] = [mockOtherUser1, mockOtherUser2, mockOtherUser3];

export { mockLoggedInUser, mockOtherUsers };
