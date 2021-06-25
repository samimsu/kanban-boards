const initialData = {
  boards: {
    'board-1': {
      id: 'board-1',
      _id: 'board-1',
      title: 'My School Board',
      cards: {
        'card-1': {
          id: 'card-1',
          _id: 'card-1',
          title: 'code',
        },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          _id: 'column-1',
          title: 'To do',
          cardIds: ['card-1'],
        },
        'column-2': {
          id: 'column-2',
          _id: 'column-2',
          title: 'In progress',
          cardIds: [],
        },
        'column-3': {
          id: 'column-3',
          _id: 'column-3',
          title: 'Done',
          cardIds: [],
        },
      },
      columnOrder: ['column-1', 'column-2', 'column-3'],
    },
  },
};
export default initialData;
