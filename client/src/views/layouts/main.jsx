import React from 'react';
import { Route } from 'react-router-dom'


import NavBar from './../components/common/navbar.jsx';
import LoginRegisterModal from './../containers/loginRegisterModal/index.jsx';
import HomePage from './../pages/home.jsx';
import AboutPage from './../pages/about.jsx';
import ContactPage from './../pages/contact.jsx';

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileMenuActive: false,
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
          toggleLoginMenu={this.toggleLoginMenu}/>
        <LoginRegisterModal isActive={this.state.isLoginMenuActive} toggleActive={this.toggleLoginMenu}/>
        <Route exact path="/" component={HomePage}/>
        <Route path="/about" component={AboutPage}/>
        <Route path="/contact" component={ContactPage}/>
      </div>
    )
  }
}

export default MainLayout;