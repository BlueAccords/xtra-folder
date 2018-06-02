import React, { Fragment } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FolderTable from './FolderTable.jsx';
import FolderSortOptions from './FolderSortOptions.jsx';
import FolderSearchOption from './FolderSearchOption.jsx';
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
      searchFilter: '',
    }

    this.handlePageJump = this.handlePageJump.bind(this);
    this.handleQueryParamChange = this.handleQueryParamChange.bind(this);
    this.handleSearchFilterChange = this.handleSearchFilterChange.bind(this);
    this.handleSearchFilterSubmit = this.handleSearchFilterSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
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

    // returns a function that changes query param based on the passed param.
    handleQueryParamChange(keyName) {
      return (e) => {
        this.setState({
          [keyName]: e.target.value
        }, () => {
          this.props.actions.fetchFolders({
            ...this.state,
            clearCache: true
          });
        });
      }
    }
  
    // special version for filter to add a debounce delay while user is typing
    handleSearchFilterChange(e) {
      this.setState({
        searchFilter: e.target.value
      });
    }

    handleSearchFilterSubmit(e) {
      e.preventDefault();
      this.props.actions.fetchFolders({
        ...this.state,
        clearCache: true
      });
    }

    handleReset(e) {
      e.preventDefault();
      this.setState({
        sortKey: 'id',
        sortDirection: 'ASC',
        searchFilter: '',
      }, () => {
        this.props.actions.fetchFolders({
          ...this.state,
          clearCache: true
        });
      });
    }

  render() {
    const { isLoading, currentPageFolders, currentPage, lastPage } = this.props;
    return (
      <Fragment>
        <div className="columns">
          <div className="column field">
            <FolderSearchOption
              onSearchFilterChange={this.handleSearchFilterChange}
              onSearchFilterSubmit={this.handleSearchFilterSubmit}
              searchFilter={this.state.searchFilter}
              onReset={this.handleReset}
            /> 
          </div>
          <div className="column field is-grouped sort-options-right">
            <FolderSortOptions
              sortKey={this.state.sortKey}
              sortDirection={this.state.sortDirection}
              onSortKeyChange={this.handleQueryParamChange('sortKey')} 
              onSortDirectionChange={this.handleQueryParamChange('sortDirection')} 
            />
          </div>       
        </div>
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