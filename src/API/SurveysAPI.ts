import * as _ from 'lodash';

import { api } from '../axiosConfig';
import {surveysURL, surveyEmailSchedule} from "../Utils/urls";

export class SurveysAPI {
    static getAll(
        limit = 100000,
        offset = 0,
    ): Promise<any[]> {
        return api.get(`${surveysURL}/getAll/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

    static create(values: any): Promise<any> {
        return api.post(`${surveysURL}/create`, values)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static getOne(
        id : string
    ): Promise<any[]> {
        return api.get(`${surveysURL}/getOne/${id}`, {
        }).then((res) => {
            return _.get(res, 'data.data', {});
        });
    }

    static getOneDetails(
        id : string
    ): Promise<any[]> {
        return api.get(`${surveysURL}/getOneDetails/${id}`, {
        }).then((res) => {
            return _.get(res, 'data.data', {});
        });
    }

    static update(id: string, values: any): Promise<any> {
        return api.put(`${surveysURL}/update/${id}`, values)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static deleteOne(id: string): Promise<any> {
        return api.delete(`${surveysURL}/delete/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static addPartners(values: any): Promise<any> {
        return api.post(`${surveysURL}/add-partners`, values)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }



    static getAllTemplate(
        id: string,
        limit = 100000,
    ): Promise<any[]> {
        return api.get(`${surveysURL}/getAll-template/${id}/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

    static createTemplate(values: any): Promise<any> {
        return api.post(`${surveysURL}/create-template`, values)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static getOneTemplate(
        id : string
    ): Promise<any[]> {
        return api.get(`${surveysURL}/getOne-template/${id}`, {
        }).then((res) => {
            return _.get(res, 'data.data', {});
        });
    }

    static updateTemplate(id: string, values: any): Promise<any> {
        return api.put(`${surveysURL}/update-template/${id}`, values)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static deleteOneTemplate(id: string): Promise<any> {
        return api.delete(`${surveysURL}/delete-template/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }



    static getAllEmailSchedule(
        id: string,
        limit = 100000,
    ): Promise<any[]> {
        return api.get(`${surveyEmailSchedule}/getAll/${id}/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

    static createEmailSchedule(values: any): Promise<any> {
        return api.post(`${surveyEmailSchedule}/create`, values)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static getOneEmailSchedule(
        id : string
    ): Promise<any[]> {
        return api.get(`${surveyEmailSchedule}/getOne/${id}`, {
        }).then((res) => {
            return _.get(res, 'data.data', {});
        });
    }

    static updateEmailSchedule(id: string, values: any): Promise<any> {
        return api.put(`${surveyEmailSchedule}/update/${id}`, values)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static deleteEmailSchedule(id: string): Promise<any> {
        return api.delete(`${surveyEmailSchedule}/delete/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static sendInviteNow(id: string): Promise<any> {
        return api.get(`${surveyEmailSchedule}/sendNow/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }


    static panelistSurveys(id: string): Promise<any> {
        return api.get(`${surveysURL}/panelist-surveys/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static panelistOneSurvey(id: string): Promise<any> {
        return api.get(`${surveysURL}/panelist-one-surveys/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static GetUserOneAssignedSurveyCallback(data: any): Promise<any> {
        return api.post(`${surveysURL}/GetUserOneAssignedSurveyCallback`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static userRespondentDashboardWeb(userId: any): Promise<any> {
        return api.get(`${surveysURL}/userRespondentDashboardWeb/${userId}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

}
