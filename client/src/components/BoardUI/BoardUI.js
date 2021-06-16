/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Board from './Board';

export default function BoardUI({ board }) {
  return <Board initialBoard={board} />;
}
