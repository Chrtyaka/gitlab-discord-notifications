import { WebhookClient } from 'discord.js';
import { WebhookMessageOptions } from 'discord.js';
import { findDiscordSettingsByProject } from '../utils/config';
import { ConfigProjectNotFoundError } from '../errors/config';

export const sendMessage = (
  message: WebhookMessageOptions,
  projectId: number,
) => {
  const settings = findDiscordSettingsByProject(projectId);

  if (settings instanceof ConfigProjectNotFoundError) {
    return settings;
  }

  const { webhookUrl, webhookName, webhookAvatar } = settings;

  const webhookClient = new WebhookClient({ url: webhookUrl });

  return webhookClient.send({
    username: webhookName,
    avatarURL: webhookAvatar,
    ...message,
  });
};
