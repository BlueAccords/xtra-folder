import React, { Fragment } from 'react';

import NavBar from './NavBar/index.jsx';
import Footer from './Footer/index.jsx';
import LoginRegisterModal from './../../containers/loginRegisterModal/index.jsx';


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
      <Fragment>
        <NavBar 
          isActive={this.state.isMobileMenuActive} 
          toggleMobileMenu={this.toggleMobileMenu} 
          toggleLoginMenu={this.toggleLoginMenu}
          />
        { this.state.isLoginMenuActive && <LoginRegisterModal toggleActive={this.toggleLoginMenu}/>}
        <div className='primary-content'>
          {this.props.children}
        </div>
        <Footer/>
      </Fragment>
    )
  }
}

export default MainLayout;