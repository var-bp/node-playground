import express from 'express';
import routesV1 from './src/routes/v1';

const PORT = 8000;
const HOST = '0.0.0.0';

const app = express();

app.use(express.json()); // It parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // It parses incoming requests with urlencoded payloads

app.use('/api/v1', routesV1);

// Send back a 404 error for any unknown api request
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      message: 'Unknown api request',
    },
  });
});

app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on http://localhost:${PORT}/`);
});
