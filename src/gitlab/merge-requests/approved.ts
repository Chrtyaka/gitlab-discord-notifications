import { sendMessage } from '../../discord';
import { generateMessageContent } from '../../discord/embeds/merge-request/approved';
import { WebhookBody } from '../../types/gitlab';
import { MergeRequestAttributes } from '../../types/gitlab/merge-requests';

export async function onApproved(action: WebhookBody<MergeRequestAttributes>) {
  const { embeds, content } = generateMessageContent(action);
  const { id } = action.project;

  await sendMessage(
    {
      content,
      embeds,
    },
    id,
  );
}
