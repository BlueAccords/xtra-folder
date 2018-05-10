import React from 'react';
import PT from 'prop-types';
import UserMenu from './UserMenu.jsx';
import { Link } from 'react-router-dom'

const DesktopMenu = ({ user, isSessionLoaded, toggleLoginMenu, userLogoutRequest}) => {
  return (
    <div className='navbar-menu' role="navigation" aria-label="main navigation">
      <div className="navbar-start">
        {user && <Link to="/dashboard" className="navbar-item">Dashboard</Link>}
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/about" className="navbar-item">About</Link>
        <Link to="/contact" className="navbar-item">Contact</Link>
      </div>
      <div className="navbar-end">
      <UserMenu 
        user={user}
        isSessionLoaded={isSessionLoaded}
        toggleMenu={toggleLoginMenu}
        requestUserLogout={userLogoutRequest}
      />
    </div>
  </div>
  )
}

DesktopMenu.propTypes = {
  user: PT.object,
  isSessionLoaded: PT.bool.isRequired,
  toggleLoginMenu: PT.func.isRequired,
  userLogoutRequest: PT.func.isRequired
}

export default DesktopMenu;