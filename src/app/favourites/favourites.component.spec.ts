import { Sort } from '@angular/material/sort';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlightSearchService } from '../services/flight-search.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesComponent } from './favourites.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { WeatherService } from '../services/weather.service';

describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;
  let weatherService: WeatherService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ FavouritesComponent ],
      providers: [
        { provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({
              from: 'AMS',
              to: 'LCG',
              date: '08/08/2022',
              get: (id) => {return 'param'}
            })}
        },
        WeatherService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.get(WeatherService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#markPreferredDestination function:',()=> {
    it('should mark the data array as preferred', () => {
      spyOn(weatherService, 'getAverageTemperature').and.returnValues(20,40,30);
      component.destinations=['AMD', 'MAD', 'LCG'];
      const data=[[['flightoption1'],['weather1']], [['flightoption2'],['weather1']], [['flightoption3'],['weather3']]]
      component.markPreferredDestination(data);
      expect(data[0][2]).toBeTrue();
    });
  });

  describe('#sortData function:',()=> {
    it('should sort the array by price', ()=> {
      const sort: Sort ={
        active: 'price',
        direction: 'asc'
      }
      component.destinationData = [[[{price:4}],['weather1']], [[{price:6}],['weather2']], [[{price:5}],['weather3']]]
      component.sortData(sort);
      expect(component.sortedData).toEqual(
        [[[{price:4}],['weather1']], [[{price:5}],['weather3']], [[{price:6}],['weather2']]]
      )
    });

    it('should sort the array by duration', ()=> {
      const sort: Sort ={
        active: 'duration',
        direction: 'asc'
      }
      component.destinationData = [[[{duration:4}],['weather1']], [[{duration:6}],['weather2']], [[{duration:5}],['weather3']]]
      component.sortData(sort);
      expect(component.sortedData).toEqual(
        [[[{duration:4}],['weather1']], [[{duration:5}],['weather3']], [[{duration:6}],['weather2']]]
      )
    });

    it('should not sort the array if no active field is selected', ()=> {
      const sort: Sort ={
        active: '',
        direction: 'asc'
      }
      component.destinationData = [[[{duration:4}],['weather1']], [[{duration:6}],['weather2']], [[{duration:5}],['weather3']]]
      component.sortData(sort);
      expect(component.sortedData).toEqual(
        [[[{duration:4}],['weather1']], [[{duration:6}],['weather2']], [[{duration:5}],['weather3']]]
      )
    });

    it('should not sort the array if unknown  field is given', ()=> {
      const sort: Sort ={
        active: 'random',
        direction: 'asc'
      }
      component.destinationData = [[[{duration:4}],['weather1']], [[{duration:6}],['weather2']], [[{duration:5}],['weather3']]]
      component.sortData(sort);
      expect(component.sortedData).toEqual(
        [[[{duration:4}],['weather1']], [[{duration:6}],['weather2']], [[{duration:5}],['weather3']]]
      )
    });
  });

  it('showDestination should navigate to search results', () => {
    spyOn(router, 'navigate');
    const testDate = new Date('04/22/2018');
    component.source = 'MAD';
    component.destinations=['AMS','LCG'],
    component.date = '22/4/2018';
    component.showDestination(1);
    expect(router.navigate).toHaveBeenCalledWith(['/search-results'], {
      queryParams: { 
        from: 'MAD',
        to: 'LCG',
        date: "22/4/2018"
      }
    });
  });
});
