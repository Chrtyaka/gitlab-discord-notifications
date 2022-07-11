import { MessageEmbed, WebhookMessageOptions } from 'discord.js';
import { GitlabUserNotFoundError } from '../../../errors/gitlab';
import { generateUserMention } from '../../../gitlab/utils';
import { WebhookBody } from '../../../types/gitlab';
import { MergeRequestAttributes } from '../../../types/gitlab/merge-requests';

import { getEmbedColor } from './utils';

export function generateMessageContent(
  webhook: WebhookBody<MergeRequestAttributes>,
): Partial<WebhookMessageOptions> {
  const embedColor = getEmbedColor('approved');

  const { username: approvedByUsername } = webhook.user;
  const { author_id: authorUserId } = webhook.object_attributes;
  const { id: project_id } = webhook.project;

  let approvedBy = generateUserMention(approvedByUsername, project_id);

  let createdBy = generateUserMention(authorUserId, project_id, 'gitlabId');

  if (approvedBy instanceof GitlabUserNotFoundError) {
    approvedBy = approvedByUsername;
  }

  if (createdBy instanceof GitlabUserNotFoundError) {
    createdBy = `Gitlab user with id ${authorUserId}`;
  }

  const { object_attributes: mrDetails } = webhook;

  const embed = new MessageEmbed();

  embed
    .setTitle('Merge request approved! :white_check_mark:')
    .setColor(embedColor)
    .setDescription(`Merge request approved by ${approvedBy}!`)
    .addFields([
      {
        name: 'Title',
        value: mrDetails.title,
      },
      {
        name: 'URL',
        value: mrDetails.url,
      },
      {
        name: 'Status',
        value: mrDetails.merge_status,
      },
    ])
    .setTimestamp();

  return { embeds: [embed], content: createdBy };
}
