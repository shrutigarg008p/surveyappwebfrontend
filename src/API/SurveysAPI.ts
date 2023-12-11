import * as _ from 'lodash';

import { api } from '../axiosConfig';
import {surveysURL} from "../Utils/urls";

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
}
