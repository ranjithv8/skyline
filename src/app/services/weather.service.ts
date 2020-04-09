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
    this.apikey = 'K3JAwzgXMAgalLUPrAD73dGrH0PibAel';
  }

  fetchLocationKey(locationCode) {
    /*return this.http.get('/api/location',{
      params: {
        apikey: this.apikey,
        q: locationCode,
        type: '38',
        language: 'en-us',
        details: 'false'
      }
    });*/
    return of(
      [
        {
          "Version": 1,
          "Key": "4164_POI",
          "Type": "POI",
          "Rank": 125,
          "LocalizedName": "Amsterdam Airport Schiphol",
          "EnglishName": "Amsterdam Airport Schiphol",
          "PrimaryPostalCode": "",
          "Region": {
            "ID": "EUR",
            "LocalizedName": "Europe",
            "EnglishName": "Europe"
          },
          "Country": {
            "ID": "NL",
            "LocalizedName": "Netherlands",
            "EnglishName": "Netherlands"
          },
          "AdministrativeArea": {
            "ID": "NH",
            "LocalizedName": "North Holland",
            "EnglishName": "North Holland",
            "Level": 1,
            "LocalizedType": "Province",
            "EnglishType": "Province",
            "CountryID": "NL"
          },
          "TimeZone": {
            "Code": "CEST",
            "Name": "Europe/Amsterdam",
            "GmtOffset": 2,
            "IsDaylightSaving": true,
            "NextOffsetChange": "2020-10-25T01:00:00Z"
          },
          "GeoPosition": {
            "Latitude": 52.309,
            "Longitude": 4.764,
            "Elevation": {
              "Metric": {
                "Value": -3,
                "Unit": "m",
                "UnitType": 5
              },
              "Imperial": {
                "Value": -11,
                "Unit": "ft",
                "UnitType": 0
              }
            }
          },
          "IsAlias": false,
          "SupplementalAdminAreas": [],
          "DataSets": [
            "AirQualityCurrentConditions",
            "AirQualityForecasts",
            "Alerts",
            "ForecastConfidence",
            "MinuteCast",
            "Radar"
          ]
        }
      ]
    )
  }

  fetchForecast(locationKey, locationCode) : Observable<Weather[]>{
    /*return (this.http.get('/api/forecast', {
      params: {
        apikey: this.apikey,
        language: 'en-us',
        details: 'false',
        metric: 'false',
        locationKey
      }
    })).pipe(
      map((response) => this.mapForecast(response, locationCode))
    );*/
    return of({
      "Headline": {
        "EffectiveDate": "2020-04-11T08:00:00+02:00",
        "EffectiveEpochDate": 1586584800,
        "Severity": 5,
        "Text": "Expect showers Saturday",
        "Category": "rain",
        "EndDate": "2020-04-11T20:00:00+02:00",
        "EndEpochDate": 1586628000,
        "MobileLink": "http://m.accuweather.com/en/nl/amsterdam-airport-schiphol/4164_poi/extended-weather-forecast/4164_poi?lang=en-us",
        "Link": "http://www.accuweather.com/en/nl/amsterdam-airport-schiphol/4164_poi/daily-weather-forecast/4164_poi?lang=en-us"
      },
      "DailyForecasts": [
        {
          "Date": "2020-04-08T07:00:00+02:00",
          "EpochDate": 1586322000,
          "Temperature": {
            "Minimum": {
              "Value": 48,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 71,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 3,
            "IconPhrase": "Partly sunny",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 35,
            "IconPhrase": "Partly cloudy",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/nl/amsterdam-airport-schiphol/4164_poi/daily-weather-forecast/4164_poi?day=1&lang=en-us",
          "Link": "http://www.accuweather.com/en/nl/amsterdam-airport-schiphol/4164_poi/daily-weather-forecast/4164_poi?day=1&lang=en-us"
        },
        {
          "Date": "2020-04-09T07:00:00+02:00",
          "EpochDate": 1586408400,
          "Temperature": {
            "Minimum": {
              "Value": 44,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 67,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 4,
            "IconPhrase": "Intermittent clouds",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 35,
            "IconPhrase": "Partly cloudy",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/nl/amsterdam-airport-schiphol/4164_poi/daily-weather-forecast/4164_poi?day=2&lang=en-us",
          "Link": "http://www.accuweather.com/en/nl/amsterdam-airport-schiphol/4164_poi/daily-weather-forecast/4164_poi?day=2&lang=en-us"
        },
        {
          "Date": "2020-04-10T07:00:00+02:00",
          "EpochDate": 1586494800,
          "Temperature": {
            "Minimum": {
              "Value": 46,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 65,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 3,
            "IconPhrase": "Partly sunny",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 36,
            "IconPhrase": "Intermittent clouds",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/nl/amsterdam-airport-schiphol/4164_poi/daily-weather-forecast/4164_poi?day=3&lang=en-us",
          "Link": "http://www.accuweather.com/en/nl/amsterdam-airport-schiphol/4164_poi/daily-weather-forecast/4164_poi?day=3&lang=en-us"
        },
        {
          "Date": "2020-04-11T07:00:00+02:00",
          "EpochDate": 1586581200,
          "Temperature": {
            "Minimum": {
              "Value": 50,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 70,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 6,
            "IconPhrase": "Mostly cloudy",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Light"
          },
          "Night": {
            "Icon": 35,
            "IconPhrase": "Partly cloudy",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/nl/amsterdam-airport-schiphol/4164_poi/daily-weather-forecast/4164_poi?day=4&lang=en-us",
          "Link": "http://www.accuweather.com/en/nl/amsterdam-airport-schiphol/4164_poi/daily-weather-forecast/4164_poi?day=4&lang=en-us"
        },
        {
          "Date": "2020-04-12T07:00:00+02:00",
          "EpochDate": 1586667600,
          "Temperature": {
            "Minimum": {
              "Value": 46,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 64,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 12,
            "IconPhrase": "Showers",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Light"
          },
          "Night": {
            "Icon": 18,
            "IconPhrase": "Rain",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Light"
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/nl/amsterdam-airport-schiphol/4164_poi/daily-weather-forecast/4164_poi?day=5&lang=en-us",
          "Link": "http://www.accuweather.com/en/nl/amsterdam-airport-schiphol/4164_poi/daily-weather-forecast/4164_poi?day=5&lang=en-us"
        }
      ]
    }).pipe(
      map((response) => this.mapForecast(response,locationCode))
    );
  }

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
