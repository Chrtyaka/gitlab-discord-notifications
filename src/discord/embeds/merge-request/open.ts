import { MessageEmbed, WebhookMessageOptions } from 'discord.js';
import type { WebhookBody } from '../../../types/gitlab';
import type { MergeRequestAttributes } from '../../../types/gitlab/merge-requests';

import { generateUserMention } from '../../../gitlab/utils';
import { generateMentionReviewers } from '../../../gitlab/utils';

import { getConfig } from '../../../app-config';
import { getNextDay } from '../../../utils/date';
import { ConfigFeatures } from '../../../types/config';
import { GitlabUserNotFoundError } from '../../../errors/gitlab';

import { getEmbedColor } from './utils';

const APP_CONFIG = getConfig();

export function generateMessageContent(
  webhook: WebhookBody<MergeRequestAttributes>,
): Partial<WebhookMessageOptions> {
  const features: ConfigFeatures = APP_CONFIG.get('features');

  const pickReviewersEnabled = features.pickReviewers;

  const embedColor = getEmbedColor('open');

  const { username } = webhook.user;
  const { id: project_id } = webhook.project;

  const embed = new MessageEmbed();

  let createdByMention = generateUserMention(username, project_id);

  if (createdByMention instanceof GitlabUserNotFoundError) {
    createdByMention = username;
  }

  const content = pickReviewersEnabled
    ? generateMentionReviewers(username, project_id)
    : null;

  const { object_attributes: mrDetails } = webhook;

  embed.setTitle('New merge request was opened! :rocket:');
  embed.setColor(embedColor);
  embed.setDescription(
    `Merge request opened by ${createdByMention}: ${mrDetails.title}`,
  );

  embed.addFields([
    {
      name: 'URL',
      value: mrDetails.url,
    },
    {
      name: 'Reviewers',
      value: content || 'No reviewers',
    },
    {
      name: 'Review Deadline',
      value: `**${getNextDay()}** :alarm_clock:`,
    },
  ]);
  embed.setTimestamp();
  return { embeds: [embed], content };
}
