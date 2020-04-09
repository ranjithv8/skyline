import { Flight, Weather } from '../../model/types';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  @Input()
  flight: Flight;

  @Input()
  forecast: Weather[];

  @Input()
  preferred: boolean;

  @Input()
  from: string;

  @Input()
  to: string;

  constructor() { }

  ngOnInit(): void {
  }

}
