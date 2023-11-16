import * as _ from 'lodash';

import { api } from '../axiosConfig';
import {marketingLinksURL} from "../Utils/urls";

export class MarketingLinksAPI {
    static getAll(
        limit = 1000,
        offset = 0,
    ): Promise<any[]> {
        return api.get(`${marketingLinksURL}/getAll/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

    static create(values: any): Promise<any> {
        const data = {
            name: values.name,
            description: values.description,
            clicks: values.clicks,
        };
        return api.post(`${marketingLinksURL}/create`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static update(values: any, id: any): Promise<any> {
        const data = {
            name: values.name,
            description: values.description,
            clicks: values.clicks,
        };
        return api.put(`${marketingLinksURL}/update/${id}`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }


    static getOne(id: any): Promise<any> {
        return api.get(`${marketingLinksURL}/getOne/${id}`)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

}
