declare module Bing {
  declare type ImagesOfTheDayResponse = {
    images: {
      bot: number;
      copyright: string;
      copyrightlink: string;
      drk: number;
      enddate: string;
      fullstartdate: string;
      hs: any[];
      hsh: string;
      quiz: string;
      startdate: string;
      title: string;
      top: number;
      url: string;
      urlbase: string;
      wp: boolean;
    }[];
    tooltips: {
      loading: string;
      next: string;
      previous: string;
      walle: string;
      walls: string;
    };
  };
}

declare module OpenWeather {
  declare type CurrentWeatherResponse = {
    base: string;
    clouds: {
      all: number;
    };
    cod: number;
    coord: {
      lat: number;
      lon: number;
    };
    dt: number;
    id: number;
    main: {
      feels_like: number;
      humidity: number;
      pressure: number;
      temp_max: number;
      temp_min: number;
      temp: number;
    };
    name: string;
    sys: {
      country: string;
      id: number;
      message: number;
      sunrise: number;
      sunset: number;
      type: number;
    };
    timezone: number;
    weather: {
      description: string;
      icon: string;
      id: number;
      main: string;
    }[];
    wind: {
      deg: number;
      speed: number;
    };
  };

  declare type FiveDayForecastResponse = {
    city: {
      coord: {
        lat: number;
        lon: number;
      };
      country: string;
      id: number;
      name: string;
      sunrise: number;
      sunset: number;
      timezone: number;
    };
    cnt: number;
    cod: string;
    list: {
      clouds: {
        all: number;
      };
      dt: number;
      dt_txt: string;
      main: {
        feels_like: number;
        grnd_level: number;
        humidity: number;
        pressure: number;
        sea_level: number;
        temp_kf: number;
        temp_max: number;
        temp_min: number;
        temp: number;
      };
      sys: {
        pod: string;
      };
      weather: {
        description: string;
        icon: string;
        id: number;
        main: string;
      }[];
      wind: {
        deg: number;
        speed: number;
      };
    }[];
    message: number;
  };
}
