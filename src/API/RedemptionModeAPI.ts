import * as _ from 'lodash';
import { api } from '../axiosConfig';
import {
    redemptionMode,
    getProfile,
    loginURL,
    redemptionRequest, referralsUrl,
    registrationURL,
    rewardsURL
} from '../Utils/urls';


export class RedemptionModeAPI {
    static async createRedemption(
        body: any,
    ): Promise<any> {
        return api.post(`${redemptionMode}/create`, body)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static async updateRedemption(
        body: any,
        id: any,
    ): Promise<any> {
        return api.put(`${redemptionMode}/update/${id}`, body)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static async getOneRedemption(
        id: any,
    ): Promise<any> {
        return api.get(`${redemptionMode}/getOne/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static async redemptionList(
        limit: number,
    ): Promise<any> {
        return api.get(`${redemptionMode}/getAll/${limit}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }
}
