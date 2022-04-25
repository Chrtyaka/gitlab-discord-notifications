import nconf from 'nconf';
import path from 'path';

const config = nconf;

config.argv().env();
config.file('development', path.resolve('config.json'));

export const getConfig = () => {
  return config;
};
