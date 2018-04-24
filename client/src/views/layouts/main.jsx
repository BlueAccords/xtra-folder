import React from 'react';
import { Link, Route } from 'react-router-dom'

import HomePage from './../pages/home.jsx';
import AboutPage from './../pages/about.jsx';
import ContactPage from './../pages/contact.jsx';

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };

    this.toggleClass = this.toggleClass.bind(this);
  }

  // toggle mobile menu
  toggleClass() {
    let currentState = this.state.isActive;
    this.setState({ isActive: !currentState });
  }
  render() {
    const isActiveClassName = this.state.isActive ? 'is-active' : '';
    return (
      <div>
       <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
       <div className="container">
         <div className="navbar-brand">
          <a href="#" className="navbar-item">
            Xtra-Folder
          </a>

          {/* hamburger button*/}
          <div role="button" className={`navbar-burger ${this.state.isActive ? 'is-active' : null}`} 
            aria-label="menu" aria-expanded="false"
            onClick={this.toggleClass}>
            <span aria-hidden="true"></span> 
            <span aria-hidden="true"></span> 
            <span aria-hidden="true"></span> 
          </div> 
        </div>

        {/* desktop menu, is hidden by default on mobile */}
        <div className={`navbar-menu ${this.state.isActive ? 'is-active' : null}`}
          role="navigation" aria-label="main navigation">
          <div className="navbar-end">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/about" className="navbar-item">About</Link>
            <Link to="/contact" className="navbar-item">Contact</Link>
          </div>
        </div>      
       </div>
      </nav>     
        <Route exact path="/" component={HomePage}/>
        <Route path="/about" component={AboutPage}/>
        <Route path="/contact" component={ContactPage}/>
      </div>
    )
  }
}

export default MainLayout;