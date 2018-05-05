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
        <div className='navbar-menu'
          role="navigation" aria-label="main navigation">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/about" className="navbar-item">About</Link>
            <Link to="/contact" className="navbar-item">Contact</Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <button className="button is-info" onClick={toggleLoginMenu}>Login/Register</button> 
            </div>
          </div>
        </div>

        {/* mobile menu, is hidden by default on mobile */}
        <div className={`navbar-menu ${isActive ? 'is-active' : 'is-hidden-desktop'}`}
          role="navigation" aria-label="main navigation">
          <div className="navbar-item">
            <button className="button is-info" onClick={toggleLoginMenu}>Login/Register</button> 
          </div>
          <Link to="/" className="navbar-item">Home</Link>
          <Link to="/about" className="navbar-item">About</Link>
          <Link to="/contact" className="navbar-item">Contact</Link>
        </div>
       </div>
      </nav>
  )
}

export default NavBar;