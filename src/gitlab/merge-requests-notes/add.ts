import { sendMessage } from '../../discord';
import { generateMrNotesMessageContent } from '../../discord/embeds/merge-request-notes';
import { MrNotesWebhookBody } from '../../types/gitlab';

export const onNoteAdd = async (action: MrNotesWebhookBody): Promise<void> => {
  const message = generateMrNotesMessageContent(action);

  if (!message) {
    return;
  }

  const { content, embeds } = message;
  const { id } = action.project;

  await sendMessage(
    {
      content,
      embeds,
    },
    id,
  );
};
