import axios from 'axios';
axios.defaults.withCredentials = true;
import * as helpers from './_helpers';

const BASE_URL = 'http://localhost:3000/api/'
const LIMIT = 25;

const foldersFetch = async (params) => {
  try {
    const { page, sortKey, sortDirection, searchFilter, optionsFilter } = params;

    const queryString = helpers.concatParams({
      page: page,
      limit: LIMIT,
      sortBy: sortKey,
      order: sortDirection,
      q: searchFilter
      // folder_type: optionsFilter, can be set leter via checkbox options
    });

    console.log(queryString);
    const url = BASE_URL.concat('folder', '?', queryString);
    const response = await axios.get(url);
    // const totalCount = response.headers['x-total-count'];
    const totalCount = response.data.data.total;
    const lastPage = response.data.data.lastPage;
    const results = response.data.data.results;

    // FIXME: the problem is if you make an api call for a page > last page in the api, 
    // the api will just return an empty data set but it will still be a 200 response code.
    return {
      data: results,
      lastPage: lastPage,
      currentPage: page
    }
  } catch(err) {
    // TODO: add better error handling for "network error": i.e. when server is not online at all
    // https://github.com/axios/axios#handling-errors
    console.log(err);
    throw err.response || err.message;
  }
}

export default {
  foldersFetch
}