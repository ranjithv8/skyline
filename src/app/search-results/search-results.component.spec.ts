import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Sort } from '@angular/material/sort';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let mockOptions =[
    {
      from: 'Amsterdam',
      to: 'Budapest',
      duration: 10,
      price: 10,
      displayDuration: '2h 10m'
    },{
      from: 'Amsterdam',
      to: 'Budapest',
      duration: 9,
      price: 5,
      displayDuration: '2h 10m'
    },{
      from: 'Amsterdam',
      to: 'Budapest',
      duration: 7,
      price: 20,
      displayDuration: '2h 10m'
    }]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultsComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#sortData function:',()=> {
    it('should sort the array by price', ()=> {
      const sort: Sort ={
        active: 'price',
        direction: 'asc'
      }
      component.flightOptions = mockOptions;
      component.sortData(sort);
      expect(component.sortedData).toEqual(
        [ {
            from: 'Amsterdam',
            to: 'Budapest',
            duration: 9,
            price: 5,
            displayDuration: '2h 10m'
          },{
            from: 'Amsterdam',
            to: 'Budapest',
            duration: 10,
            price: 10,
            displayDuration: '2h 10m'
          },{
            from: 'Amsterdam',
            to: 'Budapest',
            duration: 7,
            price: 20,
            displayDuration: '2h 10m'
          }]
      )
    });

    it('should sort the array by duration', ()=> {
      const sort: Sort ={
        active: 'duration',
        direction: 'asc'
      }
      component.flightOptions = mockOptions;
      component.sortData(sort);
      expect(component.sortedData).toEqual(
        [ {
          from: 'Amsterdam',
          to: 'Budapest',
          duration: 7,
          price: 20,
          displayDuration: '2h 10m'
        },{
          from: 'Amsterdam',
          to: 'Budapest',
          duration: 9,
          price: 5,
          displayDuration: '2h 10m'
        },{
          from: 'Amsterdam',
          to: 'Budapest',
          duration: 10,
          price: 10,
          displayDuration: '2h 10m'
        }]
      )
    });

    it('should not sort the array if no active field is selected', ()=> {
      const sort: Sort ={
        active: '',
        direction: 'asc'
      }
      component.flightOptions = mockOptions;
      component.sortData(sort);
      expect(component.sortedData).toEqual(
        mockOptions
      )
    });

    it('should not sort the array if unknown  field is given', ()=> {
      const sort: Sort ={
        active: 'random',
        direction: 'asc'
      }
      component.flightOptions = mockOptions;
      component.sortData(sort);
      expect(component.sortedData).toEqual(
        mockOptions
      )
    });
  });
});
