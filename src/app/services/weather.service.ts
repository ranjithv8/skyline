import { Forecast, Weather } from '../model/types';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apikey: string;
  forecast: Forecast = {};

  constructor(private http: HttpClient) { 
    this.apikey = 'K3JAwzgXMAgalLUPrAD73dGrH0PibAel'; //TODO: should be moved to server
  }

  /**
   * 
   * @param locationCode: IATA code
   * fetches the accuweather location key for the given city code
   */
  fetchLocationKey(locationCode) {
    return this.http.get('/api/location',{
      params: {
        apikey: this.apikey,
        q: locationCode,
        type: '38',
        language: 'en-us',
        details: 'false'
      }
    });
  }

  /**
   * 
   * @param locationKey : accuweather location key
   * @param locationCode : IATA location code
   * fetches forecast for next five days.
   */
  fetchForecast(locationKey, locationCode) : Observable<Weather[]>{
    return (this.http.get('/api/forecast', {
      params: {
        apikey: this.apikey,
        language: 'en-us',
        details: 'false',
        metric: 'false',
        locationKey
      }
    })).pipe(
      map((response) => this.mapForecast(response, locationCode))
    );
  }

  /**
   * 
   * @param locationCode : IATA code
   * for given city fetches the forecast
   */
  fetchForcastForLocationCode(locationCode) {
    return this.fetchLocationKey(locationCode).pipe(
      switchMap((response: any) => {
        return this.fetchForecast(response[0].Key,locationCode);
      })
    );
  }

  getAverageTemperature(code) {
    return this.forecast[code].avgTemperature;
  }

  /**
   * 
   * @param response: accuweather api response
   * @param code : IATA city code
   * maps the forecast to app types.
   */
  mapForecast(response, code): Weather[] {
    this.forecast[code] = {
      dailyWeather: [],
      avgTemperature: 0
    };
    let avgDayTemperature = 0;

    response.DailyForecasts.forEach(weather => {
      this.forecast[code].dailyWeather.push({
        maxTemperature: +weather.Temperature.Minimum.Value,
        minTemperature: +weather.Temperature.Maximum.Value,
        dayIcon: weather.Day.Icon,
        dayPhrase: weather.Day.IconPhrase,
        date: weather.Date
      });
      avgDayTemperature += (+weather.Temperature.Minimum.Value + +weather.Temperature.Maximum.Value)/2
    });
    this.forecast[code].avgTemperature = avgDayTemperature/5;
    return this.forecast[code].dailyWeather;
  }
}
