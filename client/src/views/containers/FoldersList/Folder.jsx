import React from 'react';
import PT from 'prop-types';

const Folder = ({ id, title, description, author }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{author.username}</td>
    </tr>
  )
}

Folder.propTypes = {
  id: PT.number,
  title: PT.string,
  description: PT.string,
  author: PT.object
}

export default Folder;