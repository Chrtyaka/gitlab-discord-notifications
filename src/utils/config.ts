import nconf from 'nconf';
import path from 'path';
import { ConfigTeam, ConfigTeamMember } from '../types/config';

const config = nconf;

config.argv().env();
config.file('development', path.resolve('config.json'));

export const getConfig = () => {
  return config;
};

export const findUser = (
  value: string | number,
  arg: keyof ConfigTeamMember = 'gitlabId',
): ConfigTeamMember => {
  const team: ConfigTeam = config.get('team');

  const user = team.find((item) => item[arg] === value.toString());

  if (!user) {
    console.log({ arg, value });
    throw new Error(`User with ${arg} ${value} not found in config=`);
  }

  return user;
};
