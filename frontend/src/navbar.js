import './navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome , faBook, faCirclePlus, faPieChart, faBars} from '@fortawesome/free-solid-svg-icons';

// Inside your component
const handleClick = () => {
  // Your action logic here
  console.log('Button clicked!');
};

export default function NavBar() {
  return (
    <nav className='nav'>
      <div className="centered">
        <ul className="nav-links">

          <span className="clickable-icon" onClick={handleClick}>
            <FontAwesomeIcon icon={faBars} />
          </span>

          <CustomLink to="/Home">
            <FontAwesomeIcon icon={faHome} />
          </CustomLink>

          <CustomLink to="/View-History">
            <FontAwesomeIcon icon={faBook} />
          </CustomLink>
          
          <CustomLink to="/Submit-Transaction">
            <FontAwesomeIcon icon={faCirclePlus} />
          </CustomLink>

          <CustomLink to="/View-Data">
            <FontAwesomeIcon icon={faPieChart} />
          </CustomLink>

        </ul>
      </div>
    </nav>
  );
}

function CustomLink({ to, children }) {
  const path = window.location.pathname;
  return (
    <li className={path === to ? 'active' : ''}>
      <Link to={to}>{children}</Link>
    </li>
  );
}
