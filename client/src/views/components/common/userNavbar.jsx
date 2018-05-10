import { Link } from 'react-router-dom'
import React from 'react';

const UserNavbar = ({user, isSessionLoaded, toggleMenu}) => {
  if(!isSessionLoaded) {
    return (
      // TODO: load font awesome into html file to use icons
      // <div className="navbar-item">
      //   <span className="icon">
      //     <i className="fas fa-circle-notch"></i>
      //   </span>
      // </div>
      <div className="navbar-item">
        <button className="button is-primary" onClick={toggleMenu}>Login/Register</button> 
      </div>
    );
  } else if(isSessionLoaded && !user) {
    return (
      <div className="navbar-item">
        <button className="button is-primary" onClick={toggleMenu}>Login/Register</button> 
      </div>
    );
  } else if(isSessionLoaded && user) {
    return (
      <div className="navbar-item has-dropdown is-hoverable">
        <a href="#" className="navbar-link">{user.username}</a> 
        <div className="navbar-dropdown">
          <Link to="/profile" className="navbar-item">Profile</Link>
          <Link to="/settings" className="navbar-item">Settings</Link>
          <hr className="navbar-divider"/>
          <a href="#" className="navbar-item">Logout</a>
        </div>
      </div>
    ) 
  }
}

export default UserNavbar;