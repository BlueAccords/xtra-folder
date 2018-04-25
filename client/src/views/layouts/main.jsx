import React from 'react';
import { Route } from 'react-router-dom'


import NavBar from './../components/common/navbar.jsx';
import HomePage from './../pages/home.jsx';
import AboutPage from './../pages/about.jsx';
import ContactPage from './../pages/contact.jsx';

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };

    this.toggleActive = this.toggleActive.bind(this);
  }

  // toggle mobile menu
  toggleActive() {
    let currentState = this.state.isActive;
    this.setState({ isActive: !currentState });
  }
  render() {
    const isActiveClassName = this.state.isActive ? 'is-active' : '';
    return (
      <div>
        <NavBar isActive={this.state.isActive} toggleActive={this.toggleActive} />
        <Route exact path="/" component={HomePage}/>
        <Route path="/about" component={AboutPage}/>
        <Route path="/contact" component={ContactPage}/>
      </div>
    )
  }
}

export default MainLayout;