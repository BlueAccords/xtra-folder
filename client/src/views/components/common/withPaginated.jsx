import React, { Fragment } from 'react';

// HoC to add pagination buttons (1- lastPage)
const withPaginated = (Component) => (props) => {
  const { itemsCurrentPage, itemsLastPage, onJump, isLoading  } = props;

  function getPaginatedArray(currentPage, lastPage) {
    let delta = 2;
    let left = currentPage - delta;
    let right = currentPage + delta + 1;
    let result = [];
    
    result = Array.from({length: lastPage}, (v, k) => k + 1)
      .filter(i => i && i >= left && i < right);
    
    if (result.length > 1) {
      // Add first page and dots
      if (result[0] > 1) {
        if (result[0] > 2) {
          result.unshift('...')
        }
        result.unshift(1)
      }
      
      // Add dots and last page
      if (result[result.length - 1] < lastPage) {
        if (result[result.length - 1] !== lastPage - 1) {
          result.push('...')
        }
        result.push(lastPage)
      }
    }
    
    return result;
  }

  // render list of buttons
  function renderButtons() {
    // on app init items last page will be 0
    if(itemsLastPage === 0) {
      return null;
    }

    // create array of paginated items, with '...' if distance between current page and first/last page
    // is > 2 away
    const paginatedArr = getPaginatedArray(itemsCurrentPage, itemsLastPage);
    const buttonArr = paginatedArr.map((pageItem, pageIndex) => {
      if(typeof pageItem === 'number') {
        return (
          <li key={pageItem}>
            <a 
              className={`pagination-link ${itemsCurrentPage == pageItem && 'is-current'}`}
              aria-label={`Goto page ${pageItem}`}
              onClick={onJump(pageItem)}>{pageItem}</a>
          </li>
        )
      } else {
        return (
          <li key={pageIndex + '...'}>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
        )
      }
    });

    return buttonArr;
  }

  function renderNextButton() {
    const shouldRender = itemsCurrentPage < itemsLastPage;

    return (
      <a 
        className="pagination-next"
        onClick={shouldRender ? onJump(itemsCurrentPage + 1) : undefined}   
        disabled={!shouldRender}
      >Next</a>
    )
  }

  function renderPreviousButton() {
    const shouldRender = itemsCurrentPage > 1;
    return (
      <a 
        className="pagination-previous"
        onClick={shouldRender ? onJump(itemsCurrentPage + -1) : undefined}   
        disabled={!shouldRender}
      >Previous</a>
    )
  }

  
  return (
    <Fragment>
      <nav className="pagination" role="navigation" aria-label="pagination">
        {renderPreviousButton()}
        {renderNextButton()}
        <ul className='pagination-list'>
          {renderButtons()}
        </ul>
      </nav>
        <Component {...props}/>
      <nav className="pagination" role="navigation" aria-label="pagination">
        {renderPreviousButton()}
        {renderNextButton()}
        <ul className='pagination-list'>
          {renderButtons()}
        </ul>
      </nav>
    </Fragment>
  )
}

export default withPaginated;

