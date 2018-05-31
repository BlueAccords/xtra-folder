import React, { Fragment } from 'react';


const FolderSearchOption = ({
  searchFilter,
  onSearchFilterChange
}) => {
  return (
    <Fragment>
      <div className="control">
        <label htmlFor="searchFilter" className="label">Filter</label>
        <input
          id='searchFilter'
          className='input'
          type="text"
          value={searchFilter}
          placeholder="Search..."
          onChange={onSearchFilterChange}
        />
      </div>
    </Fragment>
  )
}

export default FolderSearchOption;