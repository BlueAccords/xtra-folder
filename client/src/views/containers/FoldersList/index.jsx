import React, { Fragment } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FolderTable from './FolderTable.jsx';
import { actions as allFoldersActions } from './../../../state/allFolders';
import { selectors as allFoldersSelectors } from './../../../state/allFolders';


const columnNames = ['Id', 'Title', 'Description', 'Author'];

/**
 * Folder list component, displays a table of folders and supports
 * pagination, sorting, and filtering of folders
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
    const { fetchFolders } = this.props.actions;
    fetchFolders(this.state);
  }

  render() {
    return (
      <Fragment>
        <FolderTable 
          columnNames={columnNames}
          isLoading={this.props.isLoading}
          foldersList={this.props.currentPageFolders}/>
      </Fragment>
    )
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
      actions: bindActionCreators({
        fetchFolders: allFoldersActions.foldersFetchRequest,
        changeSearchFilter: allFoldersActions.foldersFilterRequest
      }, dispatch)
  }
}

const mapStateToProps = function(state) {
  return {
    currentPageFolders: allFoldersSelectors.getAllFoldersOfCurrentPage(state),
    isLoading: state.allFolders.isLoading,
    currentPage: state.allFolders.currentPage,
    lastPage: state.allFolders.lastPage,
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FoldersList);