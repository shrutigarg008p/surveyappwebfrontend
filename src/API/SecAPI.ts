import * as _ from 'lodash';

import { api } from '../axiosConfig';
import {secURL} from "../Utils/urls";

export class SecAPI {
    static getAll(
        limit = 1000,
        offset = 0,
    ): Promise<any[]> {
        return api.get(`${secURL}/getAll/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

    static create(values: any): Promise<any> {
        const data = {
            name: values.name,
            description: values.description,
            isActive: parseInt(values.isActive, 10)
        };
        return api.post(`${secURL}/create`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static update(values: any, id: any): Promise<any> {
        const data = {
            name: values.name,
            description: values.description,
            isActive: parseInt(values.isActive, 10)
        };
        return api.put(`${secURL}/update/${id}`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }


    static getOne(id: any): Promise<any> {
        return api.get(`${secURL}/getOne/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

}
