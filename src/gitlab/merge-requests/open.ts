import type { WebhookBody } from '../../types/gitlab';
import { sendMessage } from '../../discord';
import { generateMessageContent } from '../../discord/embeds/merge-request/open';
import { MergeRequestAttributes } from '../../types/gitlab/merge-requests';

export const onOpen = async (
  action: WebhookBody<MergeRequestAttributes>,
): Promise<void> => {
  const { embeds, content } = generateMessageContent(action);

  await sendMessage({
    content,
    embeds,
  });
};
