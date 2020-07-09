import logger from '@kobionic/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { WeatherGETSchema } from 'schemas/weather';
import { OpenWeatherClient } from 'utils/api';

async function routes(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  try {
    switch (method) {
      case 'GET':
        const searchParams = await WeatherGETSchema.validate(query);
        const { body: weather } = await OpenWeatherClient.get<OpenWeather.CurrentWeatherResponse>('weather', {
          searchParams,
        });
        res.status(200).json(weather as API.Weather.GETResponse);
        break;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      logger.debug(err.stack);
      res.status(400).send(err);
    } else {
      logger.error(err.stack);
      res.status(500).send(err);
    }
  }
}

export default routes;
