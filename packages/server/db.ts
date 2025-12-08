import { Client } from 'pg';
import { Sequelize } from 'sequelize';
import bdConfig from 'src/config/bdConfig.js';

export const createClientAndConnect = async () => {
  try {
    const client = new Client(bdConfig);

    await client.connect();

    const res = await client.query('SELECT NOW()');
    console.info('  ➜ 🎸 Connected to the database at:', res?.rows?.[0].now);
    client.end();

    return client;
  } catch (e) {
    console.error(e);
  }

  return null;
};

const logging =
  process.env.NODE_ENV === 'development'
    ? // eslint-disable-next-line no-console
      console.log
    : false;

export const sequelize = new Sequelize({ ...bdConfig, logging });

export const initSequelize = () => {
  sequelize
    .authenticate()
    .then(async () => {
      await sequelize.sync({ alter: false });
    })
    .then(() => {
      console.info('  ➜ 🎸 Database synchronized');
    })
    .catch((err) => {
      console.error('  ➜ ❌ Database connection error:', err.message);
      console.error(
        '  ➜ ⚠️  Make sure PostgreSQL is running. Start it with: docker-compose up postgres -d'
      );
    });
};
