import * as _ from 'lodash';
import { api } from '../axiosConfig';
import {
    redemptionMode,
    getProfile,
    loginURL,
    redemptionRequest, referralsUrl,
    registrationURL,
    rewardsURL, redemptionRespondentRequestURL
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


    //Redemption request
    static async createRedemptionRequest(
        body: any,
    ): Promise<any> {
        return api.post(`${redemptionRespondentRequestURL}/create`, body)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static async redemptionRequestListByUserId(
        limit: number,
        userId,
    ): Promise<any> {
        return api.get(`${redemptionRespondentRequestURL}/getAllByUserId/${userId}/${limit}`)
            .then((res) => {
                return _.get(res, 'data.data', []);
            });
    }

    static async manualApproved(
        body: any,
    ): Promise<any> {
        return api.post(`${redemptionRespondentRequestURL}/manualApprove`, body)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }
}
