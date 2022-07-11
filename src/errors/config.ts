class ConfigProjectNotFoundError extends Error {
  constructor(projectId: number) {
    super(`Project not found in config: ${projectId}`);
    this.name = 'ConfigProjectNotFoundError';
  }
}

class ConfigProjectTeamNotFound extends Error {
  constructor(projectId: number) {
    super(`Team not found in project: ${projectId}`);
    this.name = 'ConfigProjectNotFoundError';
  }
}

export { ConfigProjectNotFoundError, ConfigProjectTeamNotFound };
