import { AvailableFeatures } from './features';

export type ColorString = `#${string}`;

export type ConfigExpress = {
  port: number;
  webhookReceiveUrl: string;
};

export type ConfigDiscord = {
  webhookName: string;
  webhookUrl: string;
  webhookAvatar: string;
};

export type ConfigTeamMember = {
  gitlabId: string;
  discordId: string;
  gitlabUsername: string;
};

export type ConfigTeam = ConfigTeamMember[];

export type ConfigColors = {
  [key: string]: {
    [key: string]: ColorString;
  };
};

export type ConfigFeatures = {
  [key in AvailableFeatures]: boolean;
};

export type ConfigProjectItem = {
  id: number | number[];
  discord: ConfigDiscord;
  team: ConfigTeam;
};

export type ConfigProjects = ConfigProjectItem[];
