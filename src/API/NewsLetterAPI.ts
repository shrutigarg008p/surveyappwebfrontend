import * as _ from 'lodash';

import { api } from '../axiosConfig';
import {newsLettersURL} from "../Utils/urls";

export class NewsLetterAPI {
    static getAll(
        limit = 100000,
        offset = 0,
    ): Promise<any[]> {
        return api.get(`${newsLettersURL}/getAll/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

    static create(values: any): Promise<any> {
        return api.post(`${newsLettersURL}/create`, values)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static getOne(
        id : string
    ): Promise<any[]> {
        return api.get(`${newsLettersURL}/getOne/${id}`, {
        }).then((res) => {
            return _.get(res, 'data.data', {});
        });
    }

    static update(id: string, values: any): Promise<any> {
        return api.put(`${newsLettersURL}/update/${id}`, values)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static deleteOne(id: string): Promise<any> {
        return api.delete(`${newsLettersURL}/delete/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }


    static createSample(values: any): Promise<any> {
        return api.post(`${newsLettersURL}/create-newsletter-sample`, values)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }
}
