import * as _ from 'lodash';

import { api } from '../axiosConfig';
import {countryURL} from "../Utils/urls";

export class CountriesAPI {
    static getCountries(
        limit = 10000,
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



    static getAllStates(
        limit = 10000,
        offset = 0,
    ): Promise<any[]> {
        return api.get(`${countryURL}/getAllStates/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

    static getAllTiersBasedOnRegion(
        regions,
    ): Promise<any[]> {
        return api.post(`${countryURL}/getTiersBasedOnSegment`, regions)
            .then((res) => {
            return _.get(res, 'data.data', []);
        });
    }


    static getStatesByTiers(
        tiers,
    ): Promise<any[]> {
        return api.post(`${countryURL}/getStatesByTiers`, tiers)
            .then((res) => {
                return _.get(res, 'data.data', []);
            });
    }


    static getUniqueDistrictByStateIds(
        stateIds,
    ): Promise<any[]> {
        return api.post(`${countryURL}/getUniqueDistrictByStateIds`, stateIds)
            .then((res) => {
                return _.get(res, 'data.data', []);
            });
    }


    static getUniqueCitiesByDistrict(
        districts,
    ): Promise<any[]> {
        return api.post(`${countryURL}/getUniqueCitiesByDistrict`, districts)
            .then((res) => {
                return _.get(res, 'data.data', []);
            });
    }



    static getAllCities(
        limit = 10000,
        offset = 0,
    ): Promise<any[]> {
        return api.get(`${countryURL}/getAllCities/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }


    static getAllRegions(
        limit = 10000,
        offset = 0,
    ): Promise<any[]> {
        return api.get(`${countryURL}/getAllRegions`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }


    static getAllCitiesAndStateBasedOnZipCode(
        limit = 10000,
        zipCode = 0,
    ): Promise<any[]> {
        return api.get(`${countryURL}/getAllStatesAndCitiesByZipCode/${zipCode}/${limit}`, {
        }).then((res) => {
            return _.get(res, 'data.data', []);
        });
    }

}
