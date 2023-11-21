import * as _ from 'lodash';

import { api } from '../axiosConfig';
import { profileManagementURL } from "../Utils/urls";

export class ProfileManagementAPI {
    static getAll(
        limit = 1000,
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

}
