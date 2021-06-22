import { User } from '../interface/User';

const mockLoggedInUser: User = {
  email: 'mockLoggedInUser@gmail.com',
  profilePicture: 'https://robohash.org/mockLoggedInUser@gmail.com.png',
  board: {
    columns: [
      {
        id: 1,
        title: 'Philosophy',
        cards: [
          {
            id: 1,
            title: 'Essay on the environment',
            description: 'Card content',
          },
        ],
      },
    ],
  },
};

const mockOtherUser1: User = {
  email: 'mockTestUser1@gmail.com',
  profilePicture: 'https://robohash.org/mockTestUser1@gmail.com.png',
  board: {
    columns: [
      {
        id: 1,
        title: 'Philosophy',
        cards: [
          {
            id: 1,
            title: 'Essay on the environment',
            description: 'Card content',
          },
        ],
      },
    ],
  },
};

const mockOtherUser2: User = {
  email: 'mockTestUser2@gmail.com',
  profilePicture: 'https://robohash.org/mockTestUser2@gmail.com.png',
  board: {
    columns: [
      {
        id: 1,
        title: 'Philosophy',
        cards: [
          {
            id: 1,
            title: 'Essay on the environment',
            description: 'Card content',
          },
        ],
      },
    ],
  },
};

const mockOtherUser3: User = {
  email: 'mockTestUser3@gmail.com',
  profilePicture: 'https://robohash.org/mockTestUser3@gmail.com.png',
  board: {
    columns: [
      {
        id: 1,
        title: 'Philosophy',
        cards: [
          {
            id: 1,
            title: 'Essay on the environment',
            description: 'Card content',
          },
        ],
      },
    ],
  },
};

const mockOtherUsers: User[] = [mockOtherUser1, mockOtherUser2, mockOtherUser3];

export { mockLoggedInUser, mockOtherUsers };
