import { Component, OnInit, Input } from '@angular/core';
import { Weather } from 'src/app/model/types';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  @Input()
  forecast: Weather[];

  constructor() { }

  ngOnInit(): void {
  }

  formatDate(weatherDate){
    let date = new Date(weatherDate);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  }

}
