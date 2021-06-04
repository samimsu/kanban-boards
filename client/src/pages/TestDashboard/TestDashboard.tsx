import { Link } from 'react-router-dom';

interface Props {
  handleLogout: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const TestDashboard = ({ handleLogout }: Props): JSX.Element => {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>
        <Link to="/test-login">Logout</Link>
      </button>
    </div>
  );
};

export default TestDashboard;
