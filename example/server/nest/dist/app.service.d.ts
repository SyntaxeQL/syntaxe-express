import CountryInfo from './types';
export declare class AppService {
    getHello(): {
        [key: string]: string;
    };
    getUsers(): Array<{
        [key: string]: string | number | Array<unknown>;
    }>;
    getUsersGithub(): Array<{
        [key: string]: string | number | boolean;
    }>;
    getCountries(): CountryInfo;
    getCountriesStates(): CountryInfo;
    getCountriesStatesCities(): CountryInfo;
}
