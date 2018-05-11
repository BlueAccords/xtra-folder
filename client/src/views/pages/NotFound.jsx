import React from 'react';

const NotFound = () => {
  return(
    <div>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Page Not Found</h1>
          </div>
        </div> 
      </section>   
      <div className="section">
        <div className="container">
          <p>404 Error: Page Not Found</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound;