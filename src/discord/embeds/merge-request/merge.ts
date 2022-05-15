import { MessageEmbed, WebhookMessageOptions } from 'discord.js';
import { GitlabUserNotFoundError } from '../../../errors/gitlab';
import { generateUserMention } from '../../../gitlab/utils';
import { WebhookBody } from '../../../types/gitlab';
import { MergeRequestAttributes } from '../../../types/gitlab/merge-requests';

import { getEmbedColor } from './utils';

export function generateMessageContent(
  webhook: WebhookBody<MergeRequestAttributes>,
): Partial<WebhookMessageOptions> {
  const embedColor = getEmbedColor('merge');

  const { username: mergeByUsername } = webhook.user;
  const { author_id: authorUserId } = webhook.object_attributes;

  let mergedBy = generateUserMention(mergeByUsername);

  let createdBy = generateUserMention(authorUserId, 'gitlabId');

  if (mergedBy instanceof GitlabUserNotFoundError) {
    mergedBy = mergeByUsername;
  }

  if (createdBy instanceof GitlabUserNotFoundError) {
    createdBy = `Gitlab user with id ${authorUserId}`;
  }

  const { object_attributes: mrDetails } = webhook;

  const embed = new MessageEmbed();

  embed
    .setTitle('Merge request merged! :partying_face :tada:')
    .setColor(embedColor)
    .setDescription(`Merge request merged by ${mergedBy}!`)
    .addFields([
      {
        name: 'Title',
        value: mrDetails.title,
      },
      {
        name: 'URL',
        value: mrDetails.url,
      },
    ])
    .setTimestamp();

  return { embeds: [embed], content: createdBy };
}
