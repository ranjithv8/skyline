import { WeatherService } from './../services/weather.service';
import { FlightSearchService } from './../services/flight-search.service';
import { DestinationService } from './../services/destination.service';
import { Component, OnInit } from '@angular/core';
import { Cities } from '../model/types';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { forkJoin, Observable, combineLatest } from 'rxjs';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  favouriteCities: Cities;
  source: string;
  destinations: string[];
  date: string;
  destinationData;
  isLoading = false;
  sortedData;

  constructor(
    private route: ActivatedRoute,
    private searchService: FlightSearchService,
    private weatherService: WeatherService,
    private router: Router
  ) { }

  /*Fetching data from query params and requesting for compare data*/
  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map(params => {
          this.source = params.get('from');
          this.date = params.get('date');
          this.destinations = params.get('to').split(',');
        })
      ).subscribe(() => {
        this.isLoading = true;
        this.getDestinationDetails()
          .subscribe((data) => {
            this.setDestinationData(data);
            this.isLoading = false;
        });
      });
  }

  /*Fetches weather and flight data for the given source and destinations*/

  getDestinationDetails() {
    return forkJoin(
      this.destinations.map((destination) => {
        return combineLatest([
          this.searchService.search(this.source, destination, this.date),
          this.weatherService.fetchForcastForLocationCode(destination)
        ]);
      })
    )
  }

  setDestinationData(data) {
    this.markPreferredDestination(data);
    this.destinationData = Object.values(data);
  }

  showDestination(index) {
    this.router.navigate(['/search-results'], {
      queryParams: { 
        from: this.source,
        to: this.destinations[index],
        date: this.date
      }
    });
  }

  /* Finding the preferred destination by comparing the avg temprature*/

  markPreferredDestination(data) {
    let cityCode;
    let preferenceIndex;
    let destinationUnlikeliness = Infinity;
    let destinationAverageTemperature;
    data.forEach((destination,i) => {
      cityCode = this.destinations[i];
      destinationAverageTemperature = this.weatherService.getAverageTemperature(cityCode);
      if (destinationUnlikeliness > destinationAverageTemperature ) {
        destinationUnlikeliness = destinationAverageTemperature;
        preferenceIndex = i;
      }
    });
    data[preferenceIndex][2] = true;
  }

  sortData(sort: Sort) {
    const data = this.destinationData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'price': return this.compare(a[0][0]? a[0][0].price:0, b[0][0]? b[0][0].price:0, isAsc);
        case 'duration': return this.compare(a[0][0]? a[0][0].duration: 0, b[0][0]? b[0][0].duration:0, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
