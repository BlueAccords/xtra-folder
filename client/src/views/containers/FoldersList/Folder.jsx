import React from 'react';
import { Link } from 'react-router-dom';
import PT from 'prop-types';

const Folder = ({ id, title, description, author }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>
        <Link to={`/folders/${id}`}>
          {title}
        </Link>
      </td>
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