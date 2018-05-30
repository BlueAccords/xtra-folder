import React, { Fragment } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FolderTable from './FolderTable.jsx';
import withPaginated from './../../components/common/withPaginated.jsx';
import { actions as allFoldersActions } from './../../../state/allFolders';
import { selectors as allFoldersSelectors } from './../../../state/allFolders';


const columnNames = ['Id', 'Title', 'Description', 'Author'];

const FolderTableWithPagination = withPaginated(FolderTable);

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

    this.handlePageJump = this.handlePageJump.bind(this);
  }

  componentDidMount() {
    // fetch initial folders
    const { fetchFolders } = this.props.actions;
    fetchFolders(this.state);
  }

  handlePageJump(pageNum) {
    const { fetchFolders } = this.props.actions;
    return () => {
      fetchFolders({
        ...this.state,
        page: pageNum
      });
    }
  }

  render() {
    const { isLoading, currentPageFolders, currentPage, lastPage } = this.props;
    return (
      <Fragment>
        <FolderTableWithPagination
          columnNames={columnNames}
          isLoading={isLoading}
          foldersList={currentPageFolders}
          itemsCurrentPage={currentPage}
          itemsLastPage={lastPage}
          onJump={this.handlePageJump}
          />
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