import * as _ from 'lodash';

import { api } from '../axiosConfig';
import {countryURL} from "../Utils/urls";

export class StatesAPI {
    static getStates(
        limit = 10000,
        offset = 0,
    ): Promise<any[]> {
        return api.get(`${countryURL}/getAllStates/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

    static createState(values: any): Promise<any> {
        const data = {
            "name": values.name,
            "countryId": values.countryId
        };
        return api.post(`${countryURL}/createState`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }

    static getCities(
        limit = 10000,
        offset = 0,
    ): Promise<any[]> {
        return api.get(`${countryURL}/getAllCities/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

    static createCity(values: any): Promise<any> {
        const data = {
            "name": values.name,
            "stateId": values.stateId,
            "tier": values.tier
        };
        return api.post(`${countryURL}/createCity`, data)
            .then((res) => {
                return _.get(res, 'data.data', {});
            });
    }
}
