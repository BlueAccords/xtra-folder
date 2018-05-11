import React, { Fragment } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';

class HasRole extends React.Component {
  isUserAllowed(currentRole, requiredRole) {
    const isValid = currentRole === requiredRole;
    return isValid;
  }

  render() {
    const { children, currentUserRole, requiredRole } = this.props;

    if(this.isUserAllowed(currentUserRole, requiredRole)) {
      return (
        <Fragment>
          {children}
        </Fragment>
      )
    } else {
      return null;
    }
  }
}

const getMapStateToProps = (params = {}) => (state) => {
  const auth = state.auth;
  
  return {
    currentUserRole: auth.user && auth.user.role ? auth.user.role : 'nobody',
    ...params
  }

}

HasRole.propTypes = {
  currentUserRole: PT.string.isRequired,
  requiredRole: PT.string.isRequired
}

export default connect(getMapStateToProps(), null)(HasRole);
export const isAdmin = connect(getMapStateToProps({ requiredRole: 'admin' }), null)(HasRole);
export const isModerator = connect(getMapStateToProps({ requiredRole: 'moderator'}), null)(HasRole);
export const isLoggedIn = connect(getMapStateToProps({ requiredRole: 'standard'}), null)(HasRole)