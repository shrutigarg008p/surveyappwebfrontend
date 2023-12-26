import * as _ from 'lodash';

import { api } from '../axiosConfig';
import {profileManagementURL, questionsURL, optionsURL, userURL} from "../Utils/urls";

export class ProfileManagementAPI {
    static getAll(
        limit = 10000,
        offset = 0,
    ): Promise<any[]> {
        return api.get(`${profileManagementURL}/getAll/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

    static create(values: any): Promise<any> {
        const data = {
            name: values.name,
            description: values.description,
            displayOrder: values.displayOrder
        };
        return api.post(`${profileManagementURL}/create`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static update(values: any, id: any): Promise<any> {
        const data = {
            name: values.name,
            description: values.description,
            displayOrder: values.displayOrder
        };
        return api.put(`${profileManagementURL}/update/${id}`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }


    static getOne(id: any): Promise<any> {
        return api.get(`${profileManagementURL}/getOne/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static getOneDetails(id: any, userId: any): Promise<any> {
        return api.get(`${profileManagementURL}/getOneDetails/${id}/${userId}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static respondentProfileOverview(userId: any): Promise<any> {
        return api.get(`${userURL}/respondentProfileOverview/${userId}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static deleteOne(id: any): Promise<any> {
        return api.delete(`${profileManagementURL}/delete/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static createUserProfile(data: any): Promise<any> {
        return api.post(`${profileManagementURL}/createUserProfiles`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    //Questions

    static getAllQuestions(
        limit = 10000,
        id: string,
    ): Promise<any[]> {
        return api.get(`${questionsURL}/getAll/${id}/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

    static createQuestions(values: any): Promise<any> {
        return api.post(`${questionsURL}/create`, values)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static updateQuestions(values: any, id: any): Promise<any> {
        return api.put(`${questionsURL}/update/${id}`, values)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }


    static getOneQuestions(id: any): Promise<any> {
        return api.get(`${questionsURL}/getOne/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }


    static getQuestionOptions(questionId: any): Promise<any> {
        return api.get(`${questionsURL}/getQuestionOptions/${questionId}`)
            .then((res) => {
                return _.get(res, 'data.data', []);
            });
    }

    static deleteOneQuestions(id: any): Promise<any> {
        return api.delete(`${questionsURL}/delete/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static deleteOneOption(id: any): Promise<any> {
        return api.delete(`${optionsURL}/delete/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

}
