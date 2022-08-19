import { WebhookBody } from '../../../types/gitlab';
import { onOpen } from './open';
import { onApproved } from './approved';
import { onMerge } from './merge';
import type { MergeRequestAttributes } from '../../../types/gitlab/merge-requests';

export const setupMergeRequestAction = (
  action: WebhookBody<MergeRequestAttributes>,
) => {
  switch (action.object_attributes.action) {
    case 'open':
      onOpen(action);
      break;
    case 'approved':
      onApproved(action);
      break;
    case 'merge': 
      onMerge(action);
      break;
    default:
      break;
  }
};
