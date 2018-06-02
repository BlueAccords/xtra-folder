import React from 'react';
import PT from 'prop-types';

import Loader from './../../components/common/Loader.jsx';
import Folder from './Folder.jsx';

const FolderTable = ({ columnNames, isLoading, foldersList }) => {
  return (
  <Loader isLoading={isLoading}>
    <div className='table-container'>
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            {
              columnNames && columnNames.map((columnItem) => {
                return (<th key={columnItem}>{columnItem}</th>);
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            foldersList.map((folderItem) => {
              return <Folder
                key={folderItem.id}
                id={folderItem.id}
                title={folderItem.title}
                description={folderItem.description}
                author={folderItem.author}
              />
            })
          }
        </tbody>
      </table>
    </div>
  </Loader>
  )
}

FolderTable.propTypes = {
  columnNames: PT.arrayOf(PT.string).isRequired,
  isLoading: PT.bool.isRequired,
  foldersList: PT.arrayOf(PT.object)
}

export default FolderTable;