import nconf from 'nconf';
import path from 'path';

const config = nconf;

config.argv().env();

const isProduction = config.get('NODE_ENV') === 'production';

const configFileName = isProduction ? 'production' : 'development';
const configFilePath = isProduction ? 'config.json' : 'config-dev.json';

config.file(configFileName, path.resolve(configFilePath));

export const getConfig = () => {
  return config;
};
