import axios from 'axios';
import * as _ from 'lodash';

import {baseApiURL} from "./Utils/urls";


const api = axios.create({
  baseURL: baseApiURL,
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  return {...config};
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use((res) => res, (error) => {
  const errorResponse = _.get(error, 'response.data.message', null);
  if (errorResponse) {
    console.log(error)
    throw new Error(errorResponse);
  }
  throw new Error(error.message);
});

export { api };
