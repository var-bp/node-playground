/* eslint-disable no-console */
import express from 'express';
// import pino from 'pino-http'; // https://github.com/pinojs/pino/blob/master/docs/web.md#pino-with-express
import usersVersion1 from './src/users/v1/routes';

const PORT = process.env.PORT || 8080;

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

// app.use(pino());

app.use('/api/v1', usersVersion1);

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
  console.info(`Server started on http://localhost:${PORT}/`);
});

process.on('uncaughtException', (err) => {
  // maybe restart here
  // logger here
  console.error(`Uncaught expection: ${err.message}`);
});

process.on('unhandledRejection', (err) => {
  // maybe restart here
  // logger here
  console.error(`Unhandled rejection: ${err.message}`);
});
