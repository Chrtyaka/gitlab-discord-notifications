class ConfigProjectNotFoundError extends Error {
  constructor(projectId: number | string) {
    super(`Project not found in config: ${projectId}`);
    this.name = 'ConfigProjectNotFoundError';
  }
}

export { ConfigProjectNotFoundError };
