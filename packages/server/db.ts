import { Client } from 'pg';

import sequelize from './src/config/database.js';

export const createClientAndConnect = async (): Promise<Client | null> => {
  const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DB, POSTGRES_PORT } =
    process.env;
  try {
    const client = new Client({
      user: POSTGRES_USER,
      host: POSTGRES_HOST,
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT),
    });

    await client.connect();

    const res = await client.query('SELECT NOW()');
    // eslint-disable-next-line no-console
    console.log('  ➜ 🎸 Connected to the database at:', res?.rows?.[0].now);
    client.end();

    sequelize
      .authenticate()
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('  ➜ 🎸 Sequelize connection established');

        return sequelize.sync({
          alter: false,
          // eslint-disable-next-line no-console
          logging: console.log,
        });
      })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('  ➜ 🎸 Database synchronized');
      })
      .catch((err: Error) => {
        // eslint-disable-next-line no-console
        console.error('  ➜ ❌ Database connection error:', err.message);
        // eslint-disable-next-line no-console
        console.error(
          '  ➜ ⚠️  Make sure PostgreSQL is running. Start it with: docker-compose up postgres -d'
        );
      });

    return client;
  } catch (e) {
    console.error(e);
  }

  return null;
};
