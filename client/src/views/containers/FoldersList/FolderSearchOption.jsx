import React, { Fragment } from 'react';


const FolderSearchOption = ({
  searchFilter,
  onSearchFilterChange,
  onSearchFilterSubmit,
  onReset
}) => {
  return (
    <Fragment>
      <label htmlFor="searchFilter" className="label">Filter</label>
      <form onSubmit={onSearchFilterSubmit} className="field is-grouped">
        <div className="control is-expanded">
          <input
            id='searchFilter'
            className='input'
            type="text"
            value={searchFilter}
            placeholder="Search..."
            onChange={onSearchFilterChange}
          />            
        </div>
        <p className="control">
          <a 
            className="button is-info"
            onClick={onSearchFilterSubmit}
            >
            Search
          </a>
        </p>
        <p className="control">
          <a 
            className="button is-outlined"
            onClick={onReset}
            >
            Reset
          </a>
        </p>
      </form>
    </Fragment>
  )
}

export default FolderSearchOption;