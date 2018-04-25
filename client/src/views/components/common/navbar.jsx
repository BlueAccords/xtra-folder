// reusable navbar for header

import React from 'react';
import { Link, Route } from 'react-router-dom'

const NavBar = (props) => {
  const { isActive, toggleActive, toggleLoginMenu } = props;
  return (
       <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
       <div className="container">
         <div className="navbar-brand">
          <a href="#" className="navbar-item">
            Xtra-Folder
          </a>

          {/* hamburger button*/}
          <div role="button" className={`navbar-burger ${isActive ? 'is-active' : null}`} 
            aria-label="menu" aria-expanded="false"
            onClick={toggleActive}>
            <span aria-hidden="true"></span> 
            <span aria-hidden="true"></span> 
            <span aria-hidden="true"></span> 
          </div> 
        </div>

        {/* desktop menu, is hidden by default on mobile */}
        <div className={`navbar-menu ${isActive ? 'is-active' : null}`}
          role="navigation" aria-label="main navigation">
          <div className="navbar-end">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/about" className="navbar-item">About</Link>
            <Link to="/contact" className="navbar-item">Contact</Link>
            <div className="navbar-item">
              <button className="button is-info" onClick={toggleLoginMenu}>Login/Register</button> 
            </div>
          </div>
        </div>      
       </div>
      </nav>
  )
}

export default NavBar;