import React from 'react';
import PT from 'prop-types';

class SearchFolders extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Folders</h1>
            </div>
          </div> 
        </section>   
        <div className="section">
          <div className="container">
            <p>Search folders</p>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchFolders;