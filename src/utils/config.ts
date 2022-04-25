import { GitlabUserNotFoundError } from '../errors/gitlab';
import { ConfigTeamMember, ConfigTeam } from '../types/config';
import { getConfig } from '../app-config';

export const findUser = (
  value: string | number,
  arg: keyof ConfigTeamMember = 'gitlabId',
): ConfigTeamMember | GitlabUserNotFoundError => {
  const config = getConfig();

  const team: ConfigTeam = config.get('team');

  const user = team.find((item) => item[arg] === value.toString());

  if (!user) {
    return new GitlabUserNotFoundError(value);
  }

  return user;
};
