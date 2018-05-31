import React, { Fragment } from 'react';


const FolderSortOptions = ({
  onSortKeyChange,
  onSortDirectionChange,
  sortKey,
  sortDirection,
}) => {
  return (
    <Fragment>
      <div id="sortBy" className="control">
        <label htmlFor="sortBy" className="label">Sort by</label>
        <span className="select">
        <select
          onChange={onSortKeyChange}
          >
            <option value="id">Id</option>
            <option value="title">Title</option>
            <option value="description">Description</option>
            <option value="username">Author</option>
        </select>
        </span> 
      </div>

      <div id="sortDirection" className="control">
        <label htmlFor="sortDirection" className="label">Order</label>
        <span className="select">
        <select
            onChange={onSortDirectionChange}
            >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
        </select>
        </span> 
      </div>
    </Fragment>
  )
}

export default FolderSortOptions;

/**
 * 
 * 

<select
onChange={onSortKeyChange}
>
  <option value="id">Id</option>
  <option value="title">Title</option>
  <option value="description">Description</option>
  <option value="username">Author</option>
</select>

<select
  onChange={onSortDirectionChange}
  >
  <option value="ASC">Ascending</option>
  <option value="DESC">Descending</option>
</select>

 */