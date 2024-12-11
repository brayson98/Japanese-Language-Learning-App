import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

function Navigation() {
  const location = useLocation();
  const username = localStorage.getItem('user')?.replace(/['"]+/g, '');
  
  return (
    <nav>
      {location.pathname !== "/" && <Link to="/">Home</Link>}
      {location.pathname !== "/hiragana" && <Link to="/hiragana">Hiragana</Link>}
      {location.pathname !== "/katakana" && <Link to="/katakana">Katakana</Link>}
      {location.pathname !== "/jlptrevision" && <Link to="/jlptrevision">JLPT Revision</Link>}
      {location.pathname !== "/vocabrevision" && <Link to="/vocabrevision">Vocab Revision</Link>}
      {!username && location.pathname !== "/login" && <Link to="/login">Login</Link>}
      {!username && location.pathname !== "/signup" && <Link to="/signup">Sign Up</Link>}
      {username && <p className="username-display">Welcome, {username}!</p>}
      {username && <button onClick={() => { localStorage.removeItem('user'); window.location.reload(); }}>Logout</button>}
    </nav>
  );
}

export default Navigation;
