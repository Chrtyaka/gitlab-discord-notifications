import { sendMessage } from '../../discord';
import { generateMrNotesMessageContent } from '../../discord/embeds/merge-request-notes';
import { MrNotesWebhookBody } from '../../types/gitlab';

export const onNoteAdd = async (
  action: MrNotesWebhookBody,
): Promise<void> => {
  const { embeds, content } = generateMrNotesMessageContent(action);

  await sendMessage({
    content,
    embeds,
  });
};
