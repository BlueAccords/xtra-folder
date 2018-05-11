import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import PT from 'prop-types';

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