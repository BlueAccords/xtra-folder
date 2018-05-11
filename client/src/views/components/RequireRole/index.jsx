import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import PT from 'prop-types';

/**
 * This class is a higher order component, which wraps
 * around a component, and will conditionally render the component, or redirect the user
 * to a login/forbidden page depending on if they meet the requirements to view the page.
 * 
 * More details near the bottom of the file
 * 
 * Example usage:
 * 
 * import RequireRole from './RequireRole/index.jsx'
 * import SomeComponent from './SomeComponent';
 * render() {
 *   return (
 *     { RequireRole(SomeComponent, {requiredRole: 'admin'})}
 *   )
 * }
 */
class RequireRoleBase extends React.Component {
  constructor(props) {
    super(props);
    this.ensureAuth = this.ensureAuth.bind(this);
    this.hasRequiredRole = this.hasRequiredRole.bind(this);
    this.state = {};
  }
  ensureAuth(props) {
    const { isLoggedIn, isSessionLoaded } = props;
    if(!isSessionLoaded) {
      return false;
    }

    if(!isLoggedIn) {
      props.actions.changeRoute('/login');
    } else if(!this.hasRequiredRole(props)) {
      props.actions.changeRoute('/forbidden');
    }
  }

  // returns true if requiredrole is equal to currentUserRole
  // OR no requiredRole was passed in as a prop
  hasRequiredRole({ requiredRole, currentUserRole }) {
    return !requiredRole || requiredRole === currentUserRole;
  }

  // used to check auth roles after user session is loaded on app start
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.ensureAuth(this.props);
  }

  componentDidMount() {
    this.ensureAuth(this.props);
  }

  render() {
    const { isLoggedIn, children, isSessionLoaded } = this.props;
    if(!isSessionLoaded || !isLoggedIn || !this.hasRequiredRole(this.props)) {
      return null;
    } else {
      return (
        <Fragment>
          {children}
        </Fragment>
      );
    }
  }
}

RequireRoleBase.propTypes = {
  isLoggedIn: PT.bool.isRequired,
  currentUserRole: PT.string.isRequired,
  requiredRole: PT.string
}

const mapStateToProps = state => {
  const { user, isInitialSessionLoaded } = state.auth;
  return {
    isSessionLoaded: isInitialSessionLoaded,
    isLoggedIn: Boolean(user),
    currentUserRole: user && user.role ? user.role : 'none'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      changeRoute: (url) => { dispatch(push(url)); },
    },
    dispatch
  }
}

const RequiredRoleConnected = connect(mapStateToProps, mapDispatchToProps)(RequireRoleBase);

/**
 * A higher order component that will conditionally render its wrapped component
 * OR will redirect to login/forbidden page if role is not correct, or user is not logged in
 * 
 * @param {React.Component} WrappedComponent component to be conditionally rendered if requirements are met
 * @param {object} requireRoleProps object containing 'requiredRole' property, 
 *  an optional string to match against the user's role from redux store
 */
const RequireRole = (WrappedComponent, requireRoleProps = {}) => {
  return function(props) {
    return (
      <RequiredRoleConnected { ...requireRoleProps}>
        <WrappedComponent { ...props }/>
      </RequiredRoleConnected>
    )
  }
}

export default RequireRole;