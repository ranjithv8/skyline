import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


const mockResponse =  {
  DailyForecasts: [{
    Temperature: {
      Minimum: {
        Value: 35,
      },
      Maximum:{
        Value: 46,
      }
    },
    Day: {
      Icon: 2,
      IconPhrase: 'Bad Weather'
    },
    Date:'12/12/2012'
  },{
      Temperature: {
        Minimum:{
          Value: 42,
        },
        Maximum:{
          Value: 45,
        }
      },
      Day: {
        Icon: 4,
        IconPhrase: 'good Weather'
      },
      Date:'12/12/2012'
  }]
};
describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('mapForcast should map the response to forcast', () => {
    service.mapForecast(mockResponse,'AMS');
    expect(service.forecast).toEqual({
      AMS: {
        dailyWeather: [
          {
            maxTemperature: 35,
            minTemperature: 46,
            dayIcon: 2,
            dayPhrase: 'Bad Weather',
            date: '12/12/2012'
          },
          {
            maxTemperature: 42,
            minTemperature: 45,
            dayIcon: 4,
            dayPhrase: 'good Weather',
            date: '12/12/2012'
          }
        ],
        avgTemperature: 16.8
      }
    }) 

  })
});
