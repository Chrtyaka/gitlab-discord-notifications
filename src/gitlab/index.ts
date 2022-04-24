import type {
  MrNotesWebhookBody,
  MrWebhookBody,
  WebhookBody,
  WebhookObjectAttributes,
} from '../types/gitlab';
import { NoteAttributes } from '../types/gitlab/notes';
import { setupMergeRequestAction } from './merge-requests';
import { setupMrNotesAction } from './merge-requests-notes';

function isMergeRequestAction(webhook: WebhookBody): webhook is MrWebhookBody {
  return webhook.object_kind === 'merge_request';
}

function isNoteableTypeMr(
  attributes: WebhookObjectAttributes,
): attributes is NoteAttributes {
  return (
    'noteable_type' in attributes && attributes.noteable_type === 'MergeRequest'
  );
}

function isNoteAction(webhook: WebhookBody): webhook is MrNotesWebhookBody {
  return (
    webhook.object_kind === 'note' &&
    isNoteableTypeMr(webhook.object_attributes)
  );
}

export const setupAction = (webhook: WebhookBody) => {
  if (isMergeRequestAction(webhook)) {
    console.log('setup merge request action');
    setupMergeRequestAction(webhook);
  } else if (isNoteAction(webhook)) {
    setupMrNotesAction(webhook);
  }
};
