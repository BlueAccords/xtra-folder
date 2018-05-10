import React from 'react';
import PT from  'prop-types';
import { Link } from 'react-router-dom';

import UserMenu from './UserMenu.jsx';

const MobileMenu = ({ user, isActive, toggleLoginMenu, isSessionLoaded, userLogoutRequest}) => {
  return (
    <div className={`navbar-menu ${isActive ? 'is-active' : 'is-hidden-desktop'}`}
      role="navigation" aria-label="main navigation">
        {/* {
          user ? 
          <div className="navbar-item">Welcome! {user.username}</div>
          : <div className="navbar-item">
            <button className="button is-info" onClick={toggleLoginMenu}>Login/Register</button> 
          </div>
        } */}
      <UserMenu 
        user={user}
        isSessionLoaded={isSessionLoaded}
        toggleMenu={toggleLoginMenu}
        requestUserLogout={userLogoutRequest}
      />
      <Link to="/" className="navbar-item">Home</Link>
      <Link to="/about" className="navbar-item">About</Link>
      <Link to="/contact" className="navbar-item">Contact</Link>
    </div>
  )
}

MobileMenu.propTypes = {
  user: PT.object,
  isActive: PT.bool.isRequired,
  toggleLoginMenu: PT.func.isRequired,
  isSessionLoaded: PT.bool.isRequired,
  userLogoutRequest: PT.func.isRequired
}

export default MobileMenu;