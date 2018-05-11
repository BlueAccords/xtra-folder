// Nav bar, supports desktop and mobile menu
// used in main layout

import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';

import { actions as authActions } from '../../../../state/authentication';
import DesktopMenu from './DesktopMenu.jsx';
import MobileMenu from './MobileMenu.jsx';
import Brand from './Brand.jsx';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, user, isActive, toggleMobileMenu, toggleLoginMenu, isSessionLoaded } = this.props;
    return (
        <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
        <div className="container">
          <Brand
            toggleMobileMenu={toggleMobileMenu}
            isActive={isActive}
          />
          <DesktopMenu
              user={user}
              isSessionLoaded={isSessionLoaded}
              toggleLoginMenu={toggleLoginMenu}
              userLogoutRequest={actions.userLogoutRequest}
          />
          {/* mobile menu, is hidden by default on mobile */}
          <MobileMenu
            user={user}
            isSessionLoaded={isSessionLoaded}
            isActive={isActive}
            toggleLoginMenu={toggleLoginMenu}
            userLogoutRequest={actions.userLogoutRequest}
          />
          
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

NavBar.propTypes = {
  isActive: PT.bool.isRequired,
  toggleMobileMenu: PT.func.isRequired,
  toggleLoginMenu: PT.func.isRequired,
  isSessionLoaded: PT.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);