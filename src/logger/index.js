import path from 'path';
import pino from 'pino';
import projectRoot from '../utils/projectRoot.cjs';

// https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/
// https://github.com/pinojs/pino/blob/master/docs/help.md
// https://github.com/pinojs/pino/blob/master/docs/api.md#loggerlevel-string-gettersetter
const logger = pino(
  {
    level: process.env.LOG_LEVEL,
    transport:
      process.env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'SYS:standard',
            },
          }
        : undefined,
  },
  pino.multistream(
    Object.keys(pino.levels.values).map((level) => ({
      level,
      stream: pino.destination(path.join(projectRoot, `./src/logger/${level}.log`)),
    })),
    {
      levels: pino.levels.values,
      dedupe: true,
    },
  ),
);

export default logger;
