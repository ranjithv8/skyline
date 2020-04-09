import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { City, Cities } from '../model/types';
import { of } from 'rxjs';
import { DestinationService } from '../services/destination.service';
import { Router } from '@angular/router';


const mockCities: Cities = {
  AMS: {
    code: 'AMS',
    name: 'Amsterdam',
    favourite: false
  },
  MAD: {
    code: 'MAD',
    name: 'MADRID',
    favourite: false
  }
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let destinationService: DestinationService;
  let router: Router;
  let formBuilder: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,RouterTestingModule, HttpClientTestingModule,MatAutocompleteModule],
      declarations: [ SearchComponent ],
      providers: [DestinationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    destinationService = TestBed.get(DestinationService);
    router = TestBed.get(Router);
    formBuilder = TestBed.get(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("#starDestination function:", () => {
    it('should add the city to favourites', () => {
      component.favouriteCities = {};
      const city: City = {
        code: 'CDG',
        favourite: false,
        name: 'Paris'
      };;
      component.starDestination({stopPropagation: () => {}}, city );
      expect(city.favourite).toBeTruthy();
      expect(component.favouriteCities[city.code]).toBeDefined();
    });

    it('should remove the city from favourites if unstarred', () => {
      const city: City = {
        code: 'CDG',
        favourite: true,
        name: 'Paris'
      };
      component.favouriteCities = {CDG: {...city} };
      component.starDestination({stopPropagation: () => {}}, city );
      expect(city.favourite).toBeFalsy();
      expect(component.favouriteCities[city.code]).toBeUndefined();
    });
  });

  it('fetchCities should fetch and set the city valueset', () => {
    spyOn(destinationService, 'fetch').and.returnValue(of(mockCities));
    component.fetchCities();
    expect(component.sources).toEqual([{
        code: 'AMS',
        name: 'Amsterdam',
        favourite: false
      }, {
        code: 'MAD',
        name: 'MADRID',
        favourite: false  
      }
    ])
  });

  it('search should navigate to search', () => {
    spyOn(router, 'navigate');
    const testDate = new Date('04/22/2018');
    component.searchForm = formBuilder.group ({
      source: {
        code: 'MAD',
        name: 'Amsterdam',
        favourite: false  
      },
      destination: {
        code: 'AMS',
        name: 'Amsterdam',
        favourite: false  
      },
      date: testDate
    });
    component.search();
    expect(router.navigate).toHaveBeenCalledWith(['/search-results'], {
      queryParams: { 
        from: 'MAD',
        to: 'AMS',
        date: "22/4/2018"
      }
    });
  });

  it('compareFavourites should navigate with proper parameters', () => {
    const testDate = new Date('04/22/2018');
    component.searchForm = formBuilder.group ({
      source: {
        code: 'MAD',
        name: 'MADRID',
        favourite: false  
      },
      date: testDate
    });
    component.favouriteCities = {
      AMS:{
        code: 'AMS',
        name: 'Amsterdam',
        favourite: false
      },
      LCG:{
        code: 'LCG',
        name: 'Paris',
        favourite: false
      }
    }
    spyOn(router, 'navigate');
    component.comparefavourites();
    expect(router.navigate).toHaveBeenCalledWith(['/favourites'],{
      queryParams: { 
        from: 'MAD',
        to: 'AMS,LCG',
        date: "22/4/2018"
      }
    });
  });

  describe("#disableComparison function:", () => {
    it('comparison should be disabled if date is not selected', () => {
      component.searchForm = formBuilder.group({
        date: ['', Validators.required],
        source: ['Amsterdam', Validators.required]
      });
      component.favouriteCities = mockCities;
      fixture.detectChanges();
      expect(component.disableComparison()).toBeTrue();
    });

    it('comparison should be disabled if favourite cities not selected', () => {
      component.searchForm = formBuilder.group({
        date: [new Date(), Validators.required],
        source: ['Amsterdam', Validators.required]
      });
      component.favouriteCities = {};
      fixture.detectChanges();
      expect(component.disableComparison()).toBeTrue();
    });
  });

  describe("#filterCollection function:", () => {
    it('should return back values for autocomplete if string is passed', () => {
      const cities = Object.values(mockCities);
      expect(component.filterCollection('ams', cities)).toEqual([{
        code: 'AMS',
        name: 'Amsterdam',
        favourite: false
      }]);
    });

    it('should return back values for autocomplete if object is passed', () => {
      const cities = Object.values(mockCities);
      expect(component.filterCollection({
        code: 'AMS',
        name: 'Amsterdam',
        favourite: false
      }, cities)).toEqual([{
        code: 'AMS',
        name: 'Amsterdam',
        favourite: false
      }]);
    });
  });

});
