import { MrNotesWebhookBody } from '../../types/gitlab';
import { onNoteAdd } from './add';

export const setupMrNotesAction = (action: MrNotesWebhookBody) => {
  switch (action.event_type) {
    case 'note':
      onNoteAdd(action);
      break;
    default:
      break;
  }
};
