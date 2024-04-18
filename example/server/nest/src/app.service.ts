import { Injectable } from '@nestjs/common';

import * as appUsers from '../../../../data/app-users.js';
import * as githubUsers from '../../../../data/github-users.js';
import * as countries from '../../../../data/countries.js';
import * as countriesStates from '../../../../data/countries-states.js';
import * as countriesStatesCities from '../../../../data/countries-states-cities.js';

import CountryInfo from './types';

@Injectable()
export class AppService {
  getHello(): { [key: string]: string } {
    return {
      message: 'This is a syntaxe-enabled nest.js application.'
    };
  }

  getUsers(): Array<{ [key: string]: string | number | Array<unknown> }> {
    return appUsers;
  }

  getUsersGithub(): Array<{ [key: string]: string | number | boolean }> {
    return githubUsers;
  }

  getCountries(): CountryInfo {
    return countries;
  }

  getCountriesStates(): CountryInfo {
    return countriesStates;
  }

  getCountriesStatesCities(): CountryInfo {
    return countriesStatesCities;
  }
}
