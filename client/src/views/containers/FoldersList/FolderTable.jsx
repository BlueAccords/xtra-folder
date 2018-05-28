import React from 'react';
import PT from 'prop-types';

import Folder from './Folder.jsx';

const FolderTable = ({ columnNames, isLoading, foldersList }) => {
  return (
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
          />
        })
      }
    </tbody>
  </table>     
  )
}

FolderTable.propTypes = {
  columnNames: PT.arrayOf(PT.string).isRequired,
  isLoading: PT.bool.isRequired,
  foldersList: PT.arrayOf(PT.object)
}

export default FolderTable;