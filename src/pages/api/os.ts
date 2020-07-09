import logger from '@kobionic/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import os from 'os';

async function routes(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  try {
    switch (method) {
      case 'GET':
        const uptimeInSeconds = os.uptime();
        const days = Math.floor(uptimeInSeconds / (3600 * 24));
        const hours = Math.floor((uptimeInSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
        const freeMem = os.freemem();
        const totalMem = os.totalmem();
        res.status(200).json({
          cpuCoresNumber: os.cpus().length,
          loadAverage: os.loadavg(),
          osArchitecture: os.arch(),
          osPlatform: process.platform,
          osRelease: `${os.type()} ${os.release()}`,
          systemUptimeInSeconds: uptimeInSeconds,
          systemUptimeInWords: [
            days > 0 && `${days} days`,
            hours > 0 && `${hours} hours`,
            `${minutes} minute${minutes > 1 ? 's' : ''}`,
          ]
            .filter(x => x)
            .join(' '),
          totalMemoryInMB: totalMem / (1 << 20),
          totalMemoryUsageInPercent: Math.floor((freeMem * 100) / totalMem),
        } as API.OS.GETResponse);
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
