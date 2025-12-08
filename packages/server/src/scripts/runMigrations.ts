import sequelize from '../config/database.js';

const runMigrations = async () => {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Database connection established');

    await sequelize.sync({ force: false, alter: false });
    // eslint-disable-next-line no-console
    console.log('Database synchronized');

    await sequelize.close();
    // eslint-disable-next-line no-console
    console.log('Migration completed');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Migration error:', error);
    process.exit(1);
  }
};

runMigrations();

