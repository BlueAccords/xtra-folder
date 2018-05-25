import React from 'react';
import PT from 'prop-types';

import FoldersList from './../containers/FoldersList/index.jsx'

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
            <FoldersList/>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchFolders;