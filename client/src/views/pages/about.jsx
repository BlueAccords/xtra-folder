import React from 'react';

const AboutPage = () => {
  return(
    <div>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">About</h1>
          </div>
        </div> 
      </section>   
      <div className="section">
        <div className="container">
          <p>This site is a web application built to create folders for the gameboy advanced game series "Megaman Battle Network".</p> 
          <p>More specifically, it's meant to support Megaman Battle Network 6 as it was the last battle network game to be released and the one most often played today.</p>
        </div>
      </div>
    </div>

  )
}

export default AboutPage;