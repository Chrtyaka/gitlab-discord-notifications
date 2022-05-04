import { MessageEmbed, WebhookMessageOptions } from 'discord.js';
import type { WebhookBody } from '../../types/gitlab';
import type {
  MergeRequestAttributes,
  MergeRequestColors,
} from '../../types/gitlab/merge-requests';

import { generateUserMention } from '../../gitlab/utils';
import { pickReviewers } from '../../gitlab/utils';

import { getConfig } from '../../app-config';
import { getNextDay } from '../../utils/date';
import { ConfigFeatures } from '../../types/config';

const APP_CONFIG = getConfig();

const generateMentionReviewers = (username: string) => {
  const reviewers = pickReviewers(username);

  return reviewers.map((item) => generateUserMention(item)).join('');
};

export const generateOpenMrMessageContent = (
  webhook: WebhookBody<MergeRequestAttributes>,
): Partial<WebhookMessageOptions> => {
  const colors: MergeRequestColors = APP_CONFIG.get('colors:mergeRequests');
  const features: ConfigFeatures = APP_CONFIG.get('features');

  const pickReviewersEnabled = features.pickReviewers;

  const { open } = colors;
  const { username } = webhook.user;

  const embed = new MessageEmbed();

  const createdByMention = generateUserMention(username);

  const content = pickReviewersEnabled
    ? generateMentionReviewers(username)
    : null;

  const { object_attributes: mrDetails } = webhook;

  embed.setTitle('New merge request was opened! :rocket:');
  embed.setColor(open);
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
};
