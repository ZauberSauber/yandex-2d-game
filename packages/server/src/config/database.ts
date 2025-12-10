import { Sequelize } from 'sequelize';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env;

const logging =
  process.env.NODE_ENV === 'development'
    ? // eslint-disable-next-line no-console
      console.log
    : false;

const sequelize = new Sequelize(
  POSTGRES_DB || 'postgres',
  POSTGRES_USER || 'postgres',
  POSTGRES_PASSWORD || 'postgres',
  {
    host: POSTGRES_HOST || 'localhost',
    port: Number(POSTGRES_PORT) || 5432,
    dialect: 'postgres',
    logging,
  }
);

export default sequelize;
