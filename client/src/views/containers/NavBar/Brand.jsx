import PT from 'prop-types';
import React from 'react';

const Brand = ({ toggleActive, isActive }) => {
  return (
    <div className="navbar-brand">
      <a href="#" className="navbar-item">
        Xtra-Folder
      </a>

      {/* hamburger button*/}
      <div role="button" className={`navbar-burger ${isActive ? 'is-active' : null}`} 
        aria-label="menu" aria-expanded="false"
        onClick={toggleActive}>
        <span aria-hidden="true"></span> 
        <span aria-hidden="true"></span> 
        <span aria-hidden="true"></span> 
      </div> 
    </div>
  )
}

Brand.propTypes = {
  toggleActive: PT.func,
  isActive: PT.bool
}

export default Brand;