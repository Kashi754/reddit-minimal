import { Link } from "react-router-dom";
import './NotFound.css';

export function NotFound() {
    return (
        <div className="error-container">
            <div className="error-card">
                <h1>Error 404</h1>
                <h2>Oops! You seem to be lost.</h2>
                <p>Here are some helpful links:</p>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/subreddits'>Subreddits</Link></li>
                    <li><Link to='/users'>Users</Link></li>
                </ul>
            </div>
        </div>
    )
}