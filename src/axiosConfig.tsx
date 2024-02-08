import axios from 'axios';
import * as _ from 'lodash';
import { store } from './reducers';
import {baseApiURL} from "./Utils/urls";


const api = axios.create({
  baseURL: baseApiURL,
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const state = store.getState();

  const language = _.get(state, 'adminUser.adminUser.language', null);
  const configCopy = { ...config };

  if (!!language) {
    configCopy.headers['language'] = `${language}`;
  } else {
    configCopy.headers['language'] = 'en';
  }

  return configCopy;
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
