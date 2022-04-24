class GitlabUserNotFoundError extends Error {
  constructor(userId: number | string) {
    super(`User not found in config: ${userId}`);
    this.name = 'GitlabUserNotFoundError';
  }
}

export { GitlabUserNotFoundError };
