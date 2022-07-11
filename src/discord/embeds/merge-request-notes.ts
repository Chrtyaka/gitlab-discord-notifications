import { MessageEmbed, WebhookMessageOptions } from 'discord.js';
import { generateUserMention } from '../../gitlab/utils';
import { MrNotesWebhookBody } from '../../types/gitlab';
import { NoteColors } from '../../types/gitlab/notes';
import { getConfig } from '../../app-config';
import { GitlabUserNotFoundError } from '../../errors/gitlab';

const APP_CONFIG = getConfig();

export const generateMrNotesMessageContent = (
  webhook: MrNotesWebhookBody,
): Partial<WebhookMessageOptions> | null => {
  const colors: NoteColors = APP_CONFIG.get('colors:notes');

  const { author_id } = webhook.merge_request;
  const { username } = webhook.user;
  const { id: project_id } = webhook.project;

  const authorMention = generateUserMention(author_id, project_id, 'gitlabId');
  const noteAuthor = generateUserMention(username, project_id);

  if (
    authorMention instanceof GitlabUserNotFoundError ||
    noteAuthor instanceof GitlabUserNotFoundError
  ) {
    return null;
  }

  const messageMention = authorMention === noteAuthor ? null : authorMention;

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

  return { embeds: [embed], content: `${messageMention}` };
};
