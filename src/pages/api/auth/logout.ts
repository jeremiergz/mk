import logger from '@kobionic/logger';
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWT_COOKIE } from 'utils/api';

async function routes(req: NextApiRequest, res: NextApiResponse) {
  try {
    const removeJWTCookie = cookie.serialize(JWT_COOKIE, null, { expires: new Date(0), maxAge: -1, path: '/' });
    res.setHeader('Set-Cookie', removeJWTCookie);
    res.writeHead(302, { Location: '/admin/login' }).end();
  } catch (err) {
    logger.error(err.stack);
    res.status(500).send(err);
  }
}

export default routes;
