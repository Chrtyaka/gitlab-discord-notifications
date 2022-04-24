import { getConfig } from '../utils/config';
import { WebhookClient } from 'discord.js';
import { WebhookMessageOptions } from 'discord.js';

const config = getConfig();

export const sendMessage = (message: WebhookMessageOptions) => {
  const { webhookUrl, webhookName, webhookAvatar } = config.get('discord');

  const webhookClient = new WebhookClient({ url: webhookUrl });

  return webhookClient.send({
    username: webhookName,
    avatarURL: webhookAvatar,
    ...message,
  });
};
