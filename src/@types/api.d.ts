declare module API {
  declare module Auth {
    declare type UserWithJWT = {
      jwt: string;
      user: Models.User;
    };

    declare module Login {
      declare type POSTResponse = UserWithJWT;
    }

    declare module Me {
      declare type GETResponse = UserWithJWT;
    }
  }

  declare module OS {
    declare type GETResponse = {
      cpuCoresNumber: number;
      loadAverage: [number, number, number];
      osArchitecture: string;
      osPlatform: string;
      osRelease: string;
      systemUptimeInSeconds: number;
      systemUptimeInWords: string;
      totalMemoryInMB: number;
      totalMemoryUsageInPercent: number;
    };
  }

  declare module Settings {
    declare type JSON = {
      displayDate: boolean;
      displayWallpapers: boolean;
      location: string;
    };

    declare type GETResponse = JSON;

    declare type PUTResponse = JSON;
  }

  declare module Users {
    declare type JSON = RawUser[];

    declare type RawUser = Models.User & {
      password: string;
    };
  }

  declare module Wallpapers {
    declare type GETResponse = Bing.ImagesOfTheDayResponse;
  }

  declare module Weather {
    declare type GETResponse = OpenWeather.CurrentWeatherResponse;
  }
}
