import pg from 'pg';
import logger from '../logger';

// https://node-postgres.com/features/pooling
const pool = new pg.Pool();

pool.on('error', (err, client) => {
  logger.fatal(err);
  client.release();
  process.exit(1);
});

export default pool;
