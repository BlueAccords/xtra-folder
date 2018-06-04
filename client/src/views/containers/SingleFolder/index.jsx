import React, { Fragment } from 'react';
import ChipList from './ChipList.jsx';
import ChipTable from './ChipTable.jsx'

class SingleFolder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, author, created_at, child_chips = [] } = this.props;
    return (
      <Fragment>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
            {title}
            </h1>
            <h2 className="subtitle">
            By - {author && author.username}
            </h2>
          </div>
        </div>
      </section>
      <div className="container single-folder-container">
        <div className="container-space-between">
          <h2 className='title'>Chips</h2>
          <button className="button">Edit</button>
        </div>
        <ChipTable chips = {child_chips}/>
      </div>
      </Fragment>
    );
  }
}

export default SingleFolder;