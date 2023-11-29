import * as _ from 'lodash';

import { api } from '../axiosConfig';
import {samplesURL} from "../Utils/urls";

export class SamplesAPI {
    static getAll(
        limit = 100000,
        offset = 0,
    ): Promise<any[]> {
        return api.get(`${samplesURL}/getAll/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

    static create(values: any): Promise<any> {
        return api.post(`${samplesURL}/create`, values)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static getOne(
        id : string
    ): Promise<any[]> {
        return api.get(`${samplesURL}/getOne/${id}`, {
        }).then((res) => {
            return _.get(res, 'data.data', {});
        });
    }

    static update(id: string, values: any): Promise<any> {
        return api.put(`${samplesURL}/update/${id}`, values)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static deleteOne(id: string): Promise<any> {
        return api.delete(`${samplesURL}/delete/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }


    static createQuestion(values: any): Promise<any> {
        return api.post(`${samplesURL}/create-questions`, values)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static getOneQuestion(id: any): Promise<any> {
        return api.get(`${samplesURL}/get-SampleQuestion/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static getQuestions(secId: any): Promise<any> {
        return api.get(`${samplesURL}/get-SampleQuestions/${secId}`)
            .then((res) => {
                return _.get(res, 'data.data', []);
            });
    }

    static removeQuestion(id: any): Promise<any> {
        return api.delete(`${samplesURL}/remove-question/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }
}
