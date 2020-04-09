import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlightSearchService } from './flight-search.service';


const mockResponse =  {
                        'data': [{
                          'fly_duration': '2h 10m',
                          'flyFrom': 'AMS',
                          'cityFrom': 'Amsterdam',
                          'cityCodeFrom': 'AMS',
                          'mapIdfrom': 'amsterdam_nl',
                          'flyTo': 'BUD',
                          'cityTo': 'Budapest',
                          'cityCodeTo': 'BUD',
                          'mapIdto': 'budapest_hu',
                          'distance': 1169.67,
                          'airlines': ['U2'],
                          'pnr_count': 1,
                          'price': 67,
                          'quality': 96.33326,
                          "duration": {
                            "departure": 7800,
                            "return": 0,
                            "total": 7800
                          },
                        }, {
                          'fly_duration': '2h 10m',
                          'flyFrom': 'AMS',
                          'cityFrom': 'Amsterdam',
                          'cityCodeFrom': 'AMS',
                          'mapIdfrom': 'amsterdam_nl',
                          'flyTo': 'BUD',
                          'cityTo': 'Budapest',
                          'cityCodeTo': 'BUD',
                          'mapIdto': 'budapest_hu',
                          'distance': 1169.67,
                          'airlines': ['U2'],
                          'pnr_count': 1,
                          'virtual_interlining': false,
                          'has_airport_change': false,
                          'technical_stops': 0,
                          'price': 90,
                          "duration": {
                            "departure": 10000,
                            "return": 0,
                            "total": 10000
                          },
                        }]
                      };
describe('FlightSearchService', () => {
  let service: FlightSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FlightSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('mapFlights should map the flight response properly', () => {
    service.mapFlights(mockResponse, 'AMS', 'LCG');
    expect(service.flights).toEqual({
      'AMS_LCG': {
        flightOptions: [{
          from: "Amsterdam",
          to: "Budapest",
          duration: 7800,
          price: 67,
          displayDuration: "2h 10m",
        },{
          from: "Amsterdam",
          to: "Budapest",
          duration: 10000,
          price: 90,
          displayDuration: "2h 10m",
        }]
      }
    })
  })
});
