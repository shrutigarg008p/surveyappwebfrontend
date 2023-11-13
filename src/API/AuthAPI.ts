import * as _ from 'lodash';
import { api } from '../axiosConfig';
import {
    createBasicProfileURL,
    getProfile,
    loginURL,
    redemptionRequest, referralsUrl,
    registrationURL,
    rewardsURL
} from '../Utils/urls';


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


    static async profile(
        userId: string,
    ): Promise<any> {
        return api.get(`${getProfile}/${userId}`)
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

    static async redemptionList(
        limit: string,
    ): Promise<any> {
        return api.get(`${redemptionRequest}/${limit}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static async rewardsList(
        limit: string,
    ): Promise<any> {
        return api.get(`${rewardsURL}/${limit}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static async referralsList(
        limit: string,
    ): Promise<any> {
        return api.get(`${referralsUrl}/${limit}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }
}
