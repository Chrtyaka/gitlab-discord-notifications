import { GitlabUserNotFoundError } from '../errors/gitlab';
import { ConfigProjectNotFoundError } from '../errors/config';
import {
  ConfigTeamMember,
  ConfigDiscord,
  ConfigProjectItem,
  ConfigProjects,
} from '../types/config';
import { getConfig } from '../app-config';

export const findUser = (
  value: string | number,
  arg: keyof ConfigTeamMember = 'gitlabId',
  projectId: number,
): ConfigTeamMember | GitlabUserNotFoundError | ConfigProjectNotFoundError => {
  const project = findProjectById(projectId);

  if (project instanceof ConfigProjectNotFoundError) {
    return project;
  }

  const { team } = project;

  const user = team.find((item) => item[arg] === value.toString());

  if (!user) {
    return new GitlabUserNotFoundError(value);
  }

  return user;
};

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

export function findDiscordSettingsByProject(
  projectId: number,
): ConfigDiscord | ConfigProjectNotFoundError {
  const project = findProjectById(projectId);

  if (project instanceof ConfigProjectNotFoundError) {
    return project;
  }

  return project.discord;
}
