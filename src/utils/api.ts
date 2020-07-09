import { promises as fs } from 'fs';
import got from 'got';
import jsonwebtoken from 'jsonwebtoken';
import { EOL } from 'os';
import path from 'path';

const CONFIG_PATH = process.env.CONFIG_PATH || './data/settings.json';
const USERS_PATH = process.env.USERS_PATH || './data/users.json';

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '10', 10);

const JWT_ALGORITHM = (process.env.JWT_ALGORITHM || 'HS256') as jsonwebtoken.Algorithm;
const JWT_COOKIE = 'jwt';
const JWT_COOKIE_EXPIRES_IN = parseInt(process.env.JWT_COOKIE_EXPIRES_IN || '7', 10);
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const JWT_ISSUER = process.env.JWT_ISSUER || 'mk.jeremierodriguez.com';
const JWT_SECRET = process.env.JWT_SECRET || 'thisIsNotSecret';

const BING_API_URL = process.env.BING_API_URL || 'https://bing.com';
const OPENWEATHER_API_URL = process.env.OPENWEATHER_API_URL || 'https://api.openweathermap.org/data/2.5';

/**
 * HTTP client configured to communicate with the Bing API.
 */
const BingClient = got.extend({
  prefixUrl: BING_API_URL,
});

/**
 * Reads content from file & returns it as JSON.
 *
 * @param file the file to read
 * @param defaultValue the default value to initialize if file not found
 */
async function getFile<T = unknown>(file: string, defaultValue?: T) {
  const filePath = path.resolve(file);
  const fileStats = await fs.stat(filePath).catch(() => {});
  if (!fileStats || !fileStats.isFile()) {
    if (defaultValue) {
      await fs.writeFile(filePath, `${JSON.stringify(defaultValue, undefined, 2)}${EOL}`, 'utf8');
      return defaultValue;
    } else {
      throw new Error('Could not find file');
    }
  } else {
    return JSON.parse(await fs.readFile(filePath, 'utf8')) as T;
  }
}

/**
 * HTTP client configured to communicate with the Yahoo Weather API.
 */
const OpenWeatherClient = got.extend({
  prefixUrl: OPENWEATHER_API_URL,
  searchParams: { appid: process.env.OPENWEATHER_API_KEY, units: 'metric' },
});

export {
  BCRYPT_ROUNDS,
  BING_API_URL,
  BingClient,
  CONFIG_PATH,
  getFile,
  JWT_ALGORITHM,
  JWT_COOKIE,
  JWT_COOKIE_EXPIRES_IN,
  JWT_EXPIRES_IN,
  JWT_ISSUER,
  JWT_SECRET,
  OPENWEATHER_API_URL,
  OpenWeatherClient,
  USERS_PATH,
};
