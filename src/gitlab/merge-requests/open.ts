import type { WebhookBody } from '../../types/gitlab';
import { sendMessage } from '../../discord';
import { generateOpenMrMessageContent } from '../../discord/embeds/merge-requests';
import { MergeRequestAttributes } from '../../types/gitlab/merge-requests';


export const onOpen = async (
  action: WebhookBody<MergeRequestAttributes>,
): Promise<void> => {
  const { embeds, content } = generateOpenMrMessageContent(action);

  await sendMessage({
    content,
    embeds,
  });
};
