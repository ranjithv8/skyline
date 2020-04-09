export interface Cities {
    [code: string]: City;
}

export interface City {
    name: string;
    favourite: boolean;
    code: string;
}

export interface Weather {
    minTemperature: number;
    maxTemperature: number;
    dayIcon: number;
    dayPhrase: string;
    date: string;
}

export interface Flight {
    from: string;
    to: string;
    duration: number;
    displayDuration: string;
    price: number;
}

export interface Flights {
    [code: string]: {
        flightOptions: Flight[];
    }
}

export interface Forecast {
    [code: string]: {
        dailyWeather: Weather[];
        avgTemperature: number;
    }
}
