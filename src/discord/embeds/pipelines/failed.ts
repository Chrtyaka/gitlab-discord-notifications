import { MessageEmbed, WebhookMessageOptions } from 'discord.js';
import { GitlabUserNotFoundError } from '../../../errors/gitlab';
import { generateUserMention } from '../../../gitlab/utils';
import { WebhookBody } from '../../../types/gitlab';
import { PipelineAttributes } from '../../../types/gitlab/pipelines';
import { generatePipelineUrl, getEmbedColor } from './utils';

export function generateMessageContent(
  webhook: WebhookBody<PipelineAttributes>,
): Partial<WebhookMessageOptions> | null {
  const embedColor = getEmbedColor(webhook.object_attributes.status);

  const { username } = webhook.user;
  const { id, ref, tag } = webhook.object_attributes;
  const { web_url } = webhook.project;
  const { id: project_id } = webhook.project;

  const embed = new MessageEmbed();

  let pipelineOwnerMention = generateUserMention(username, project_id);

  if (pipelineOwnerMention instanceof GitlabUserNotFoundError) {
    pipelineOwnerMention = username;
  }

  const pipelineUrl = generatePipelineUrl(id, web_url);

  embed
    .setTitle(' :fire: :rotating_light: :fire: ALARM, PIPELINE HAS FAILED!')
    .setColor(embedColor)
    .addFields([
      {
        name: 'URL',
        value: pipelineUrl,
      },
      {
        name: 'REF',
        value: ref,
      },
    ])
    .setTimestamp();

  return { embeds: [embed], content: pipelineOwnerMention };
}
