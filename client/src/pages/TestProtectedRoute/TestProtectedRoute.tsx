import { BrowserRouter, Link } from 'react-router-dom';

interface Props {
    user: boolean,
    handleLogin: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
}

export default function TestProtectedRoute({ user, handleLogin }: Props): JSX.Element {
    return (
        <div>
            <p>
            <BrowserRouter>
                <Link to="/dashboard">View Dashboard</Link>
            </BrowserRouter>
            </p>
            <p>Logged in status = {user ? 'true' : 'false'}</p>
            <button onClick={handleLogin}>{user ? 'Log Out' : 'Log In'}</button>
        </div>
    )
}

