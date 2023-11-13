export const baseStaticURL = process.env.REACT_APP_STATIC_BASE_URL;
export const baseApiURL = process.env.REACT_APP_BASE_URL_API;

export const loginURL = '/api/v1/auth/user/login';
export const registrationURL = '/api/v1/auth/user/signup';
export const createBasicProfileURL = '/api/v1/auth/user/update-basic-profile';
export const countryListURL = '/api/v1/country/getAll';
export const stateListURL = '/api/v1/country/getAllStatesByCountryId';
export const cityListURL = '/api/v1/country/getAllCitiesByStateId';

