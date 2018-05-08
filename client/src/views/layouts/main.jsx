import React from 'react';
import { connect } from 'react-redux';


import NavBar from './../components/common/navbar.jsx';
import LoginRegisterModal from './../containers/loginRegisterModal/index.jsx';


class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileMenuActive: false,
      isLoginMenuActive: false,
    };

    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.toggleLoginMenu = this.toggleLoginMenu.bind(this);
  }

  // toggle mobile menu
  toggleMobileMenu() {
    let currentState = this.state.isMobileMenuActive;
    this.setState({ isMobileMenuActive: !currentState });
  }

  // toggle login modal menu
  toggleLoginMenu() {
    let currentState = this.state.isLoginMenuActive;
    this.setState({ isLoginMenuActive: !currentState });
  }
  

  render() {
    const isActiveClassName = this.state.isMobileMenuActive ? 'is-active' : '';
    return (
      <div>
        <NavBar 
          isActive={this.state.isMobileMenuActive} 
          toggleActive={this.toggleMobileMenu} 
          toggleLoginMenu={this.toggleLoginMenu}
          user={this.props.user}/>
        { this.state.isLoginMenuActive && <LoginRegisterModal toggleActive={this.toggleLoginMenu}/>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, null)(MainLayout);