import * as _ from 'lodash';
import { api } from '../axiosConfig';
import {
    createBasicProfileURL,
    getProfile,
    loginURL,
    redemptionRequest, redemptionRespondentRequestURL,
    referralsUrl,
    registrationURL, rewardsAPIURL,
    rewardsURL, surveysURL,
    usersListURL, userURL
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


    static async uploadProfile(
        body: any
    ): Promise<any> {
        return api.post(`${userURL}/uploadProfile`, body)
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


    static async continueWithMobile(
        data: any
    ): Promise<any> {
        return api.post(`${userURL}/continueWithMobile`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static async verifyMobileOtp(
        data: any
    ): Promise<any> {
        return api.post(`${userURL}/verify-mobile`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            })
        .catch((error) => {
                console.error('Error in verifyMobileOtp:', error);
                throw error;
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

    static async approveRedemptionRequest(
        data: any,
    ): Promise<any> {
        return api.post(`${redemptionRespondentRequestURL}/approveRequest`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static async rejectRedemptionRequest(
        data: any,
    ): Promise<any> {
        return api.post(`${redemptionRespondentRequestURL}/rejectRequest`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static async rewardsList(
        limit: number,
    ): Promise<any> {
        return api.get(`${rewardsURL}/${limit}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static getAllByUserId(
        limit = 100000,
        userId,
    ): Promise<any[]> {
        return api.get(`${rewardsAPIURL}/getAllByUserId/${userId}/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

    static ResetPasswordLink(email): Promise<any> {
        return api.post(`${userURL}/reset-password`, { email: email })
            .then((res) => {
                return _.get(res, 'data.message', {});
            });
    }

    static UpdateNewPassword(token, password): Promise<any> {
        return api.post(`${userURL}/Updatenew-password/${token}`, { password: password })
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static ChangePassword(value): Promise<any> {
        return api.post(`${userURL}/change-password`, value)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static UnSubscribeUser(userId): Promise<any> {
        return api.post(`${userURL}/unSubscribeUser/${userId}`, {})
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static requestForDelete(userId): Promise<any> {
        return api.post(`${userURL}/permanentlyDelete/${userId}/user`, {})
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static userNotifications(userId): Promise<any> {
        return api.get(`${userURL}/userNotifications/${userId}`)
            .then((res) => {
                return _.get(res, 'data.data', []);
            });
    }

    static deleteActions(userId, action): Promise<any> {
        return api.put(`${userURL}/deleteActions/${userId}/${action}`, {})
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static async usersList(
        limit: number,
        type: string
    ): Promise<any> {
        return api.get(`${usersListURL}/list/${limit}/${type}`)
            .then((res) => {
                return _.get(res, 'data.data', []);
            });
    }

    static async allPanelists(
        body: any,
        limit: number
    ): Promise<any> {
        return api.post(`${usersListURL}/allPanelist/${limit}`, body)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }


    //Referrals
    static async referralsList(
        limit: number,
    ): Promise<any> {
        return api.get(`${referralsUrl}/getAll/${limit}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }


    static async createReferralRequest(
        body: any,
    ): Promise<any> {
        return api.post(`${referralsUrl}/create`, body)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }


    static async createBulkReferralRequest(
        body: any,
    ): Promise<any> {
        return api.post(`${referralsUrl}/bulkCreateReferrals`, body)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static async referralsListByUserId(
        limit: number,
        userId: string
    ): Promise<any> {
        return api.get(`${referralsUrl}/getAllUserReferrals/${userId}/${limit}`)
            .then((res) => {
                return _.get(res, 'data.data', []);
            });
    }
}
