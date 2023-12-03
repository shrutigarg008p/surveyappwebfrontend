import * as _ from 'lodash';

import { api } from '../axiosConfig';
import {messagesURL} from "../Utils/urls";

export class MessagesAPI {
    static getAll(
        limit = 100000,
        offset = 0,
    ): Promise<any[]> {
        return api.get(`${messagesURL}/getAll/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

    static create(values: any): Promise<any> {
        return api.post(`${messagesURL}/create`, values)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static getOne(
        id : string
    ): Promise<any[]> {
        return api.get(`${messagesURL}/getOne/${id}`, {
        }).then((res) => {
            return _.get(res, 'data.data', {});
        });
    }

    static update(id: string, values: any): Promise<any> {
        return api.put(`${messagesURL}/update/${id}`, values)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static deleteOne(id: string): Promise<any> {
        return api.delete(`${messagesURL}/delete/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }
}
