// const initialData = {
//   tasks: {
//     'task-1': { id: 'task-1', title: 'Save the world' },
//     'task-2': { id: 'task-2', title: 'Code' },
//     'task-3': { id: 'task-3', title: 'Play football' },
//     'task-4': { id: 'task-4', title: 'Read' },
//   },
//   columns: {
//     'column-1': {
//       id: 'column-1',
//       title: 'To do',
//       taskIds: ['task-1'],
//     },
//     'column-2': {
//       id: 'column-2',
//       title: 'In progress',
//       taskIds: ['task-2'],
//     },
//     'column-3': {
//       id: 'column-3',
//       title: 'Done',
//       taskIds: ['task-3', 'task-4'],
//     },
//   },
//   columnOrder: ['column-1', 'column-2', 'column-3'],
// };

const initialData = {
  tasks: {},
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
