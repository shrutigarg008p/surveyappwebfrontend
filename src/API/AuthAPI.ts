import * as _ from 'lodash';
import { api } from '../axiosConfig';
import {createBasicProfileURL, loginURL, registrationURL} from '../Utils/urls';


export class AuthAPI {
  static async login(
      username: string,
      password: string,
      registerType: string
  ): Promise<any> {
    return api.post(loginURL, {email: username, password, registerType})
        .then((res) => {
          return _.get(res, 'data.data', {});
        });
  }

    static async registration(
        body: any
    ): Promise<any> {
        return api.post(registrationURL, body)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static async createBasicProfile(
        body: any,
        userId: any,
    ): Promise<any> {
        return api.put(`${createBasicProfileURL}/${userId}`, body)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }
}
