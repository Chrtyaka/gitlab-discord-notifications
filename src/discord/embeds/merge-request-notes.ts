import { MessageEmbed, WebhookMessageOptions } from 'discord.js';
import { generateUserMention } from '../../gitlab/utils';
import { MrNotesWebhookBody } from '../../types/gitlab';
import { NoteColors } from '../../types/gitlab/notes';
import { findUser, getConfig } from '../../utils/config';

const APP_CONFIG = getConfig();

export const generateMrNotesMessageContent = (
  webhook: MrNotesWebhookBody,
): Partial<WebhookMessageOptions> => {
  const colors: NoteColors = APP_CONFIG.get('colors:notes');

  const { author_id } = webhook.merge_request;
  const { username } = webhook.user;
  const authorUserName = findUser(author_id, 'gitlabId').gitlabUsername;

  const authorMention = generateUserMention(authorUserName);
  const noteAuthor = generateUserMention(username);

  const embed = new MessageEmbed()
    .setColor(colors.add)
    .setTitle(
      `Hey! :bell: Somebody added a note to your merge request!`,
    )
    .setDescription(webhook.object_attributes.note)
    .addFields([
      {
        name: 'URL',
        value: webhook.object_attributes.url,
      },
    ]);

  return { embeds: [embed], content: `${authorMention}` };
};
