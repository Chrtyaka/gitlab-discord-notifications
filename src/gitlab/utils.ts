import { findTeamByProjectId, findUser } from '../utils/config';
import { createMention } from '../discord/utils';
import { ConfigTeamMember } from '../types/config';
import { GitlabUserNotFoundError } from '../errors/gitlab';
import { log } from '../utils/log';
import {
  ConfigProjectNotFoundError,
  ConfigProjectTeamNotFound,
} from '../errors/config';

function isUserObjectIsError(
  user: ConfigProjectNotFoundError | GitlabUserNotFoundError | ConfigTeamMember,
): user is GitlabUserNotFoundError | ConfigProjectNotFoundError {
  return (
    user instanceof GitlabUserNotFoundError ||
    user instanceof ConfigProjectNotFoundError
  );
}

export const generateUserMention = (
  value: string | number,
  projectId: number,
  arg: keyof ConfigTeamMember = 'gitlabUsername',
): string | GitlabUserNotFoundError => {
  const user = findUser(value, projectId, arg);

  if (isUserObjectIsError(user)) {
    log(user.message, 'error');

    return user;
  }

  return createMention(user.discordId);
};

export const pickReviewers = (createdByUser: string, projectId: number) => {
  const team = findTeamByProjectId(projectId);

  if (
    team instanceof ConfigProjectNotFoundError ||
    team instanceof ConfigProjectTeamNotFound
  ) {
    log(team.message, 'error');
    return team;
  }

  const reviewers = team
    .filter((item) => item.gitlabUsername !== createdByUser)
    .sort(() => Math.random() - 0.5);

  return reviewers.slice(0, 2).map((item) => item.discordId);
};

export const generateMentionReviewers = (
  username: string,
  projectId: number,
) => {
  const reviewers = pickReviewers(username, projectId);

  if (
    reviewers instanceof ConfigProjectNotFoundError ||
    reviewers instanceof ConfigProjectTeamNotFound
  ) {
    log(reviewers.message, 'error');
    return '';
  }

  return reviewers.map((item) => generateUserMention(item, projectId)).join('');
};
