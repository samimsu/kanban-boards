const mockData = {
  title: 'Mock Board',
  _id: 'board1',
  columns: [
    {
      _id: '1',
      title: 'Philosophy',
      cards: [
        {
          _id: '1',
          name: 'Essay on the environment',
          description: 'Card content',
        },
      ],
    },
    {
      _id: '2',
      title: 'Math',
      cards: [
        {
          _id: '9',
          name: 'Midterm exam',
          description: 'March 10',
        },
        {
          _id: '10',
          name: 'Practice exam',
          description: 'Card content',
        },
      ],
    },
    {
      _id: '3',
      title: 'In Progress',
      cards: [
        {
          _id: '11',
          name: 'Homework',
          description: 'Card content',
        },
      ],
    },
    {
      _id: '4',
      title: 'Completed',
      cards: [
        {
          _id: '12',
          name: 'Workshop',
          description: 'Card content',
        },
        {
          _id: '13',
          name: 'Practice exam',
          description: 'Card content',
        },
        {
          _id: '2',
          name: 'Research',
          description: 'Card content',
        },
      ],
    },
  ],
};

export default mockData;
