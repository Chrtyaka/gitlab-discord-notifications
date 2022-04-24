import { WebhookBody } from '../../types/gitlab';
import { onOpen } from './open';
import type { MergeRequestAttributes } from '../../types/gitlab/merge-requests';

export const setupMergeRequestAction = (action: WebhookBody<MergeRequestAttributes>) => {
  switch (action.object_attributes.action) {
    case 'open':
      onOpen(action);
      break;
    default:
      break;
  }
};
