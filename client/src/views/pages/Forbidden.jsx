import React from 'react';

const Forbidden = () => {
  return(
    <div>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Forbidden</h1>
          </div>
        </div> 
      </section>   
      <div className="section">
        <div className="container">
          <p>Error: 403 Forbidden</p>
        </div>
      </div>
    </div>

  )
}

export default Forbidden;