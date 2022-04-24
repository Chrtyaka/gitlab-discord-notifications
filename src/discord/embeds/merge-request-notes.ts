import { MessageEmbed, WebhookMessageOptions } from 'discord.js';
import { generateUserMention } from '../../gitlab/utils';
import { MrNotesWebhookBody } from '../../types/gitlab';
import { NoteColors } from '../../types/gitlab/notes';
import { getConfig } from '../../utils/config';
import { GitlabUserNotFoundError } from '../../errors/gitlab';

const APP_CONFIG = getConfig();

export const generateMrNotesMessageContent = (
  webhook: MrNotesWebhookBody,
): Partial<WebhookMessageOptions> | null => {
  const colors: NoteColors = APP_CONFIG.get('colors:notes');

  const { author_id } = webhook.merge_request;
  const { username } = webhook.user;

  const authorMention = generateUserMention(author_id, 'gitlabId');
  const noteAuthor = generateUserMention(username);

  if (
    authorMention instanceof GitlabUserNotFoundError ||
    noteAuthor instanceof GitlabUserNotFoundError
  ) {
    return null;
  }

  const embed = new MessageEmbed()
    .setColor(colors.add)
    .setTitle(`Hey! :bell: ${username} added a note to your merge request!`)
    .setDescription(webhook.object_attributes.note)
    .addFields([
      {
        name: 'Note',
        value: webhook.object_attributes.url,
      },
      {
        name: 'Merge request',
        value: webhook.merge_request.url,
      },
    ])
    .setTimestamp();

  return { embeds: [embed], content: `${authorMention}` };
};
