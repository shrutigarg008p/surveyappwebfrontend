import * as _ from 'lodash';
import { api } from '../axiosConfig';
import {countryListURL, stateListURL, cityListURL} from '../Utils/urls';


export class MasterDataAPI {
    static async countryList(
        limit: string,
    ): Promise<any> {
        return api.get(`${countryListURL}/${limit}`)
            .then((res) => {
                return _.get(res, 'data.data', []);
            });
    }

    static async stateslist(
        countryId: any,
        limit: any
    ): Promise<any> {
        return api.get(`${stateListURL}/${countryId}/${limit}`)
            .then((res) => {
                return _.get(res, 'data.data', []);
            });
    }

    static async citiesList(
        stateId: any,
        limit: any
    ): Promise<any> {
        return api.get(`${cityListURL}/${stateId}/${limit}`)
            .then((res) => {
                return _.get(res, 'data.data', []);
            });
    }
}
