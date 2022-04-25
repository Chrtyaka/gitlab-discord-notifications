import { findUser, getConfig } from '../app-config';
import { createMention } from '../discord/utils';
import { ConfigTeam, ConfigTeamMember } from '../types/config';
import { GitlabUserNotFoundError } from '../errors/gitlab';
import { log } from '../utils/log';

const APP_CONFIG = getConfig();

export const generateUserMention = (
  value: string | number,
  arg: keyof ConfigTeamMember = 'gitlabUsername',
): string | GitlabUserNotFoundError => {
  const user = findUser(value, arg);

  if (user instanceof GitlabUserNotFoundError) {
    log(user.message, 'error');

    return user;
  }

  return createMention(user.discordId);
};

export const pickReviewers = (createdByUser: string) => {
  const team: ConfigTeam = APP_CONFIG.get('team');

  const reviewers = team
    .filter((item) => item.gitlabUsername !== createdByUser)
    .sort(() => Math.random() - 0.5);

  return reviewers.slice(0, 2).map((item) => item.discordId);
};
