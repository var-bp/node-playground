import './src/utils/environmentVariables';
import express from 'express';
import os from 'os';
import usersApiV1 from './src/api/users/v1/routes';
import docsApiV1 from './src/api/docs/v1/routes';
import logger from './src/logger';

// eslint-disable-next-line prefer-destructuring
const PORT = process.env.PORT;

const app = express();

app.disable('x-powered-by'); // Remove the X-Powered-By headers, security

// Preventing clickjacking
// app.use(helmet.frameguard('sameorigin'));
// or
// app.use(helmet.frameguard('deny'));

// Don’t let browsers infer the file type
// app.use(helmet.noSniff());

app.use(express.json()); // It parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // It parses incoming requests with urlencoded payloads

app.use('/api/v1', docsApiV1);
app.use('/api/v1', usersApiV1);

// Send back a 404 error for any unknown api request
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      message: 'Unknown api request',
    },
  });
});

app.listen(PORT, () => {
  logger.info(`Server started`);
});

process.on('uncaughtException', (err) => {
  logger.fatal(err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.fatal(err);
  process.exit(1);
});

// https://stackoverflow.com/a/70644079
if (os.platform() === 'win32') {
  process.on('SIGINT', () => {
    app.close(() => {
      logger.info('Shutting down the server');
    });
  });
} else {
  process.on('SIGTERM', () => {
    app.close(() => {
      logger.info('Shutting down the server');
    });
  });
}
