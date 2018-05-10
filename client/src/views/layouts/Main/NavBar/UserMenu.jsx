import React from 'react';
import { Link } from 'react-router-dom'
import PT from 'prop-types';

const UserMenu = ({user, isSessionLoaded, toggleMenu, requestUserLogout }) => {
  async function requestLogout() {
    try {
      await requestUserLogout();
    } catch(err) {
      // TODO: flash message here to notify user of logout failure
      console.log(err);
    }
  }
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
          <a
            href="#"
            className="navbar-item"
            onClick={requestLogout} 
            >Logout</a>
        </div>
      </div>
    ) 
  }
}

UserMenu.propTypes = {
  user: PT.object,
  isSessionLoaded: PT.bool.isRequired,
  toggleMenu: PT.func.isRequired,
  requestUserLogout: PT.func.isRequired 
}

export default UserMenu;