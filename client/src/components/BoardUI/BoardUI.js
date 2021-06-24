/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Board from './Board';
// import mockData from '../../mocks/mockBoard';

export default function BoardUI({ boardData }) {
  return <Board boardData={boardData} />;
}
