import React, { Fragment } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';

/**
 * 
 */
class FoldersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'id',
      sortDirection: 'ASC',
      searchFilter: null,
    }
  }

  componentDidMount() {
    // fetch initial folders
  }

  render() {
    return (
      <Fragment>
        Folders list....
      </Fragment>
    )
  }
}

FoldersList.propTypes = {};

export default connect(
  null, // mapStateToProps
  null // mapDispatchToProps
)(FoldersList);