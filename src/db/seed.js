import '../utils/environmentVariables';
import path from 'path';
import { readdir, readFile } from 'fs/promises';
import pool from './index';
import projectRoot from '../utils/projectRoot.cjs';

(async () => {
  const seedsPath = path.join(projectRoot, 'src/db/seeds');
  const files = await readdir(seedsPath);
  const seedQueries = await Promise.all(
    files.map((file) => readFile(path.join(seedsPath, file), { encoding: 'utf8' })),
  );
  const client = await pool.connect();
  try {
    await Promise.all(seedQueries.map((seedQuery) => client.query(seedQuery)));
  } finally {
    await client.end();
  }
})().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});
