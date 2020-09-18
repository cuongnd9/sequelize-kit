import path from 'path';
import { logger, globalOptions } from 'juno-js';

import { migrateDB, config } from './components';
import { sequelize, initSequelize } from './models/sequelize';
import { createApp } from './app';

globalOptions.environment = config.nodeEnv;

const main = async () => {
  try {
    initSequelize();
    const pathToMigration = path.join(__dirname, 'migrations');
    await migrateDB(sequelize, pathToMigration).catch((error) => logger.error('Migrate error', error));
    createApp();
  } catch (error) {
    logger.error('Global error', error);
  }
};

main();
