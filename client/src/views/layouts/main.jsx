import React from 'react';

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
       <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
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

        {/* desktop menu */}
        <div className={`navbar-menu ${this.state.isActive ? 'is-active' : null}`}
          role="navigation" aria-label="main navigation">
          <div className="navbar-end">
            <a href="#" className="navbar-item">Home</a> 
            <a href="#" className="navbar-item">About</a> 
            <a href="#" className="navbar-item">Contact</a> 
          </div>
        </div>      
       </div>

      </nav>     

    )
  }
}

export default MainLayout;