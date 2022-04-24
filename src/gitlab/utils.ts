import { findUser, getConfig } from '../utils/config';
import { createMention } from '../discord/utils';
import { ConfigTeam } from '../types/config';

const APP_CONFIG = getConfig();

export const generateUserMention = (username: string): string => {
  const user = findUser(username, 'gitlabUsername');

  return createMention(user.discordId);
};

export const pickReviewers = (createdByUser: string) => {
  const team: ConfigTeam = APP_CONFIG.get('team');

  const reviewers = team
    .filter((item) => item.gitlabUsername !== createdByUser)
    .sort(() => Math.random() - 0.5);

  return reviewers.slice(0, 2).map((item) => item.discordId);
};
