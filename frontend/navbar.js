import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className='nav'>
      <div className="centered">
        <Link to="/" className="WiFinance">
          Return Home
        </Link>
        <ul className="nav-links">
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/about">About</CustomLink>
          <CustomLink to="/contact">Contact</CustomLink>
        </ul>
      </div>
    </nav>
  );
}

function CustomLink({ to, children }) {
  const path = window.location.pathname;
  return (
    <li className={path === to ? "active" : ""}>
      <Link to={to}>
        {children}
      </Link>
    </li>
  );
}
