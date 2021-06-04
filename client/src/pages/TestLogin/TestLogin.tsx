import { Link } from 'react-router-dom';

interface Props {
  user: boolean;
  handleLogin: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function TestProtectedRoute({ user, handleLogin }: Props): JSX.Element {
  return (
    <div>
      <p>
        <Link to="/test-dashboard">View Dashboard</Link>
      </p>
      <p>Logged in status = {user ? 'true' : 'false'}</p>
      <button onClick={handleLogin}>{user ? 'Log Out' : 'Log In'}</button>
    </div>
  );
}
