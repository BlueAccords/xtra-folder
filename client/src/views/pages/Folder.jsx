import React from 'react';
import axios from 'axios';
import SingleFolder from './../containers/SingleFolder/index.jsx';

class Folder extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const BASE_URL = 'http://localhost:3000/api/'
    const { match: { params } } = this.props;
    axios.get(BASE_URL.concat('folder/', params.id))
      .then((response) => {
        this.setState(response.data.data);
        console.log(response.data)
      })
  }

  render() {
    return (
      <SingleFolder {...this.state} />
    )
  }
}

export default Folder;