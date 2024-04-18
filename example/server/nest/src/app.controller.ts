import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import CountryInfo from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { [key: string]: string } {
    return this.appService.getHello();
  }

  @Get('users')
  getUsers(): Array<{ [key: string]: string | number | Array<unknown> }> {
    return this.appService.getUsers();
  }

  @Get('users-github')
  getUsersGithub(): Array<{ [key: string]: string | number | boolean }> {
    return this.appService.getUsersGithub();
  }

  @Get('countries')
  getCountries(): CountryInfo {
    return this.appService.getCountries();
  }

  @Get('countries-states')
  getCountriesStates(): CountryInfo {
    return this.appService.getCountriesStates();
  }

  @Get('countries-states-cities')
  getCountriesStatesCities(): CountryInfo {
    return this.appService.getCountriesStatesCities();
  }
}
