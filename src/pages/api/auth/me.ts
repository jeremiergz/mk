import logger from '@kobionic/logger';
import jsonwebtoken from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWT_COOKIE, JWT_SECRET } from 'utils/api';

async function routes(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  try {
    switch (method) {
      case 'GET':
        const jwt = req.cookies[JWT_COOKIE];
        if (jwt) {
          const isValid = jsonwebtoken.verify(jwt, JWT_SECRET);
          if (isValid) {
            const user = jsonwebtoken.decode(jwt);
            res.status(200).json({ jwt, user } as API.Auth.Me.GETResponse);
          } else {
            res.status(403).end();
          }
        } else {
          res.status(401).end();
        }
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
