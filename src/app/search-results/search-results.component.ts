import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlightSearchService } from '../services/flight-search.service';
import { WeatherService } from '../services/weather.service';
import { Weather, Flight } from '../model/types';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  isLoading= false;
  source: string;
  date: string;
  destination: string;
  forecast: Weather[];
  flightOptions: Flight[] = [];
  sortedData;

  constructor(
    private route: ActivatedRoute,
    private searchService: FlightSearchService,
    private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map(params => {
          this.source = params.get('from');
          this.date = params.get('date');
          this.destination = params.get('to');
        })
      ).subscribe(() => {
        this.isLoading = true;
        this.getDestinationData()
          .subscribe((data) => {
            this.setDestinationData(data);
            this.isLoading = false;
        });
      });
  }

  /*Fetches both weather and flight details for the destination*/

  getDestinationData() {
    return combineLatest([
      this.searchService.search(this.source, this.destination, this.date),
      this.weatherService.fetchForcastForLocationCode(this.destination)
    ]);
  }

  setDestinationData(data) {
    this.forecast = data[1];
    this.flightOptions = data[0];
  }

  sortData(sort: Sort) {
    const data = this.flightOptions;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'price': return this.compare(a.price, b.price, isAsc);
        case 'duration': return this.compare(a.duration, b.duration, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
