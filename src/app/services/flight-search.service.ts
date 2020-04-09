import { Flight } from '../model/types';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flights } from '../model/types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {
  flights: Flights = {}

  constructor(private http: HttpClient) { 

  }

  search(from, to, date): Observable<Flight[]> {
    return this.http.get('/api/search', {
      params: {
        fly_from: from,
        fly_to: to,
        date_from: date,
        partner: 'picky',
        direct_flights: '1'
      }
    }).pipe(
      map((response) => this.mapFlights(response, from, to))
    )
  }

  mapFlights(response, from, to): Flight[] {
    const key = `${from}_${to}`;
    this.flights[key] = {
      flightOptions: []
    }
    response.data.forEach(flight => {
      this.flights[key].flightOptions.push({
        from: flight.cityFrom,
        to: flight.cityTo,
        duration: flight.duration.total,
        price: flight.price,
        displayDuration: flight.fly_duration
      });
    });
    console.log(this.flights);
    return this.flights[key].flightOptions;
  }


}
