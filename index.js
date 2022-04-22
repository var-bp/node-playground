import express from 'express';
import routes_v1 from './src/routes/v1/index.js';

const PORT = 8000;
const HOST = '0.0.0.0';

const app = express();

app.use(express.json()); // It parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // It parses incoming requests with urlencoded payloads

app.use('/api/v1', routes_v1);

// Send back a 404 error for any unknown api request
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      message: 'Unknown api request',
    }
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Server started on http://localhost:${PORT}/`);
});
