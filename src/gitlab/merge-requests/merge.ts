import { sendMessage } from '../../discord';
import { generateMessageContent } from '../../discord/embeds/merge-request/merge';
import { WebhookBody } from '../../types/gitlab';
import { MergeRequestAttributes } from '../../types/gitlab/merge-requests';

export async function onMerge(
  action: WebhookBody<MergeRequestAttributes>,
): Promise<void> {
  const { embeds, content } = generateMessageContent(action);

  await sendMessage({
    content,
    embeds,
  });
}
