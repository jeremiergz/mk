import logger from '@kobionic/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { BingClient, BING_API_URL } from 'utils/api';

async function routes(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  try {
    switch (method) {
      case 'GET':
        const searchParams = { format: 'js', idx: 0, n: 6 };
        const {
          body: { images: rawImages, tooltips },
        } = await BingClient.get<Bing.ImagesOfTheDayResponse>('hpimagearchive.aspx', {
          responseType: 'json',
          searchParams,
        });
        const images = rawImages.map(i => ({ ...i, url: `${BING_API_URL}${i.url}` }));
        res.status(200).json({ images, tooltips } as API.Wallpapers.GETResponse);
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
