import { GitlabUserNotFoundError } from '../errors/gitlab';
import {
  ConfigProjectNotFoundError,
  ConfigProjectTeamNotFound,
} from '../errors/config';
import {
  ConfigTeamMember,
  ConfigDiscord,
  ConfigProjectItem,
  ConfigProjects,
  ConfigTeam,
} from '../types/config';
import { getConfig } from '../app-config';

function findProjectById(
  id: number,
): ConfigProjectItem | ConfigProjectNotFoundError {
  const config = getConfig();

  const projects: ConfigProjects = config.get('projects');

  const project = projects.find((item) => {
    const { id: projectId } = item;

    if (Array.isArray(projectId)) {
      return projectId.includes(id);
    } else {
      return projectId === id;
    }
  });

  if (!project) {
    return new ConfigProjectNotFoundError(id);
  }

  return project;
}

export function findTeamByProjectId(
  projectId: number,
): ConfigTeam | ConfigProjectNotFoundError | ConfigProjectTeamNotFound {
  const project = findProjectById(projectId);

  if (project instanceof ConfigProjectNotFoundError) {
    return project;
  }

  if (!project.team || project.team.length === 0) {
    return new ConfigProjectTeamNotFound(projectId);
  }

  return project.team;
}

export const findUser = (
  value: string | number,
  projectId: number,
  arg: keyof ConfigTeamMember = 'gitlabId',
): ConfigTeamMember | GitlabUserNotFoundError | ConfigProjectNotFoundError => {
  const team = findTeamByProjectId(projectId);

  if (
    team instanceof ConfigProjectNotFoundError ||
    team instanceof ConfigProjectTeamNotFound
  ) {
    return team;
  }

  const user = team.find((item) => item[arg] === value.toString());

  if (!user) {
    return new GitlabUserNotFoundError(value);
  }

  return user;
};

export function findDiscordSettingsByProject(
  projectId: number,
): ConfigDiscord | ConfigProjectNotFoundError {
  const project = findProjectById(projectId);

  if (project instanceof ConfigProjectNotFoundError) {
    return project;
  }

  return project.discord;
}
