// reusable navbar for header

import React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux';

import { actions as authActions } from './../../../state/authentication'
import UserNavbar from './userNavbar.jsx';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, user, isActive, toggleActive, toggleLoginMenu, isSessionLoaded } = this.props;
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
              {user && <Link to="/dashboard" className="navbar-item">Dashboard</Link>}
              <Link to="/" className="navbar-item">Home</Link>
              <Link to="/about" className="navbar-item">About</Link>
              <Link to="/contact" className="navbar-item">Contact</Link>
            </div>
            <div className="navbar-end">
            <UserNavbar 
              user={user}
              isSessionLoaded={isSessionLoaded}
              toggleMenu={toggleLoginMenu}
              requestUserLogout={actions.userLogoutRequest}
            />
            </div>
          </div>

          {/* mobile menu, is hidden by default on mobile */}
          <div className={`navbar-menu ${isActive ? 'is-active' : 'is-hidden-desktop'}`}
            role="navigation" aria-label="main navigation">
              {
                user ? 
                <div className="navbar-item">Welcome! {user.username}</div>
                : <div className="navbar-item">
                  <button className="button is-info" onClick={toggleLoginMenu}>Login/Register</button> 
                </div>
              }
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/about" className="navbar-item">About</Link>
            <Link to="/contact" className="navbar-item">Contact</Link>
          </div>
        </div>
        </nav>
    )

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators({
        userLogoutRequest: authActions.userLogoutRequest,
      }, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isSessionLoaded: state.auth.isInitialSessionLoaded
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);