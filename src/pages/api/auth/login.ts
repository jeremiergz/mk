import logger from '@kobionic/logger';
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import { addDays } from 'date-fns';
import jsonwebtoken from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { LoginPOSTSchema } from 'schemas/login';
import {
  getFile,
  JWT_ALGORITHM,
  JWT_COOKIE,
  JWT_COOKIE_EXPIRES_IN,
  JWT_EXPIRES_IN,
  JWT_ISSUER,
  JWT_SECRET,
  USERS_PATH,
} from 'utils/api';

async function routes(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;
  try {
    switch (method) {
      case 'POST':
        const values = await LoginPOSTSchema.validate(body);
        const users = await getFile<API.Users.JSON>(USERS_PATH, []);
        let canLogin = false;
        let rawUser: API.Users.RawUser = null;
        for (const u of users) {
          if (u.email === values.email) {
            rawUser = u;
            canLogin = await bcrypt.compare(values.password, rawUser.password);
          }
        }
        if (canLogin) {
          const user = { email: rawUser.email };
          const jwt = jsonwebtoken.sign({ user }, JWT_SECRET, {
            algorithm: JWT_ALGORITHM,
            expiresIn: JWT_EXPIRES_IN,
            issuer: JWT_ISSUER,
            subject: rawUser.email,
          });
          res.setHeader(
            'Set-Cookie',
            cookie.serialize(JWT_COOKIE, jwt, {
              domain: process.env.NODE_ENV === 'production' ? 'mk.jeremierodriguez.com' : null,
              expires: values.rememberMe ? addDays(new Date(), JWT_COOKIE_EXPIRES_IN) : null,
              httpOnly: true,
              maxAge: values.rememberMe ? JWT_COOKIE_EXPIRES_IN * 60 * 60 * 24 : null,
              path: '/',
              sameSite: 'strict',
              secure: process.env.NODE_ENV === 'production',
            }),
          );
          res.status(200).json({ jwt, user } as API.Auth.Login.POSTResponse);
        } else {
          res.status(404).end();
        }

        break;
      default:
        res.setHeader('Allow', ['POST']);
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
