import colors from 'colors';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const logColors = {
  debug: colors.cyan,
  info: colors.green,
  warn: colors.yellow,
  error: colors.red,
};

export const log = (message: string, logLevel: LogLevel = 'info') => {
  console.log(logColors[logLevel](`[${logLevel}]: ${message}`));
};
