import * as _ from 'lodash';

import { api } from '../axiosConfig';
import {labelsURL} from "../Utils/urls";

export class LabelsAPI {
    static getAll(
        limit = 1000,
        offset = 0,
    ): Promise<any[]> {
        return api.get(`${labelsURL}/getAll/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

    static create(values: any): Promise<any> {
        const data = {
            name: values.name,
            description: values.description,
        };
        return api.post(`${labelsURL}/create`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static update(values: any, id: any): Promise<any> {
        const data = {
            name: values.name,
            description: values.description,
        };
        return api.put(`${labelsURL}/update/${id}`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }


    static getOne(id: any): Promise<any> {
        return api.get(`${labelsURL}/getOne/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

}
