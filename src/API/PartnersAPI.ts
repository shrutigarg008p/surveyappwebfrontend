import * as _ from 'lodash';

import { api } from '../axiosConfig';
import {partnersURL} from "../Utils/urls";

export class PartnersAPI {
    static getPartners(
        limit = 10000,
        offset = 0,
    ): Promise<any[]> {
        return api.get(`${partnersURL}/getAll/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

    static createPartners(values: any): Promise<any> {
        const data = {
            name: values.name,
            description: values.description,
            successUrl: values.successUrl,
            overQuotaUrl: values.overQuotaUrl,
            disqualifiedUrl: values.disqualifiedUrl,
            badTerminatedUrl: values.badTerminatedUrl,
        };
        return api.post(`${partnersURL}/create`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static updatePartner(values: any, id: any): Promise<any> {
        const data = {
            name: values.name,
            description: values.description,
            successUrl: values.successUrl,
            overQuotaUrl: values.overQuotaUrl,
            disqualifiedUrl: values.disqualifiedUrl,
            badTerminatedUrl: values.badTerminatedUrl,
        };
        return api.put(`${partnersURL}/update/${id}`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }


    static getOne(id: any): Promise<any> {
        return api.get(`${partnersURL}/getOne/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

}
