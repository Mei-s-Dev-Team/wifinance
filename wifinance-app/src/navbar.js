import './navbar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome , faBook, faCirclePlus, faPieChart} from '@fortawesome/free-solid-svg-icons';



export default function NavBar() {

  return (
    <nav className='nav'>
      <ul>
          <CustomLink to="/Home">
            {/* <FontAwesomeIcon icon={faHome} /> */}
            Home
          </CustomLink>

          <CustomLink to="/View-History">
            {/* <FontAwesomeIcon icon={faBook} /> */}
            View History
          </CustomLink>
          
          <CustomLink to="/Submit-Transaction">
            {/* <FontAwesomeIcon icon={faCirclePlus} /> */}
            Submit New Transaction
          </CustomLink>

        </ul>
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
