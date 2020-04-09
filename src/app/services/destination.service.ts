import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { pipe, Observable, of } from 'rxjs';
import { City, Cities } from '../model/types';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  favouriteCities: Cities;
  cities: Cities =  null;

  constructor(private http: HttpClient) {

  }

  fetch(): Observable<Cities> {
    if(this.cities === null) {
      return this.http.get('/api/cities?type=dump&locale=en-US&location_types=airport&limit=1000&sort=name&active_only=true')
        .pipe(
          map((response: any) => {
            this.cities = {};
            response.locations.forEach(location => {
              this.cities[location.code] = {
                name: location.city.name,
                code: location.code,
                favourite: false
              };
            });
            return this.cities;
          })
        );
    }
    return of(this.cities);
  }

  getFavouriteCities() {
    return this.favouriteCities;
  }

  setFavouriteCities(cities: Cities) {
    this.favouriteCities = cities;
    Object.keys(this.favouriteCities).forEach((code) => {
      this.cities[code].favourite = true;
    });
  }

  getCity( code) {
    return  this.cities[code];
  }


}
