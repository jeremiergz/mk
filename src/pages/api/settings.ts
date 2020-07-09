import logger from '@kobionic/logger';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { CONFIG_PATH, getFile } from 'utils/api';

async function routes(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;
  try {
    switch (method) {
      case 'GET':
        try {
          const settings = await getFile<API.Settings.JSON>(CONFIG_PATH, {
            displayDate: true,
            displayWallpapers: true,
            location: 'Toulouse, France',
          });
          res.status(200).json(settings as API.Settings.GETResponse);
        } catch {
          res.status(404).end();
        }
        break;
      case 'PUT':
        const filePath = path.resolve(CONFIG_PATH);
        const keys = Object.keys(body);
        const settings = keys.sort().reduce((acc, key) => {
          acc[key] = body[key];
          return acc;
        }, {});
        await fs.writeFile(filePath, JSON.stringify(settings, undefined, 2), 'utf8');
        res.status(200).json(settings as API.Settings.PUTResponse);
        break;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    logger.error(err.stack);
    res.status(500).send(err);
  }
}

export default routes;
