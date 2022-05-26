import { sendMessage } from '../../discord';
import { generateMessageContent } from '../../discord/embeds/pipelines/failed';
import { WebhookBody } from '../../types/gitlab';
import { PipelineAttributes } from '../../types/gitlab/pipelines';

export async function onFailed(action: WebhookBody<PipelineAttributes>) {
  const message = generateMessageContent(action);
  if (!message) {
    return;
  }

  const { content, embeds } = message;

  await sendMessage({
    content,
    embeds,
  });
}
