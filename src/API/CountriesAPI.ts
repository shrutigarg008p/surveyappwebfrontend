import * as _ from 'lodash';

import { api } from '../axiosConfig';
import {countryURL} from "../Utils/urls";

export class CountriesAPI {
    static getCountries(
        limit = 1000,
        offset = 0,
    ): Promise<any[]> {
        return api.get(`${countryURL}/getAll/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

    static addCountry(values: any): Promise<any> {
        const data = {
            "name": values.name,
        };
        return api.post(`${countryURL}/create`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static getOneCountry(countryId: string | undefined): Promise<any> {
        return api.get(`${countryURL}/getOne/${countryId}`)
            .then((res) => {
                return _.get(res, 'data.data', []);
            });
    }

    static updateCountry(values: any, countryId: string): Promise<any> {
        const data = {
            "name": values.name,
        };

        return api.put(`${countryURL}/update/${countryId}`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static async checkSortnumber(sortnumber: string): Promise<any> {
        return api.post(`${countryURL}/sortnumber-check`, {sortnumber}, {
        }).then((res) => {
          return _.get(res, 'data.data', null);
        });
      }
}
