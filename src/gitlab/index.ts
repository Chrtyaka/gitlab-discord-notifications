import type {
  MrNotesWebhookBody,
  MrWebhookBody,
  WebhookBody,
  WebhookObjectAttributes,
} from '../types/gitlab';
import { NoteAttributes } from '../types/gitlab/notes';
import {
  PipelineAttributes,
  PipelineWebhookBody,
} from '../types/gitlab/pipelines';
import { setupMergeRequestAction } from './merge-requests';
import { setupMrNotesAction } from './merge-requests-notes';
import { setupPipelineAction } from './pipelines';

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

function isPipelineAction(
  webhook: WebhookBody,
): webhook is PipelineWebhookBody {
  return webhook.object_kind === 'pipeline';
}

export const setupAction = (webhook: WebhookBody) => {
  console.log(webhook);
  if (isMergeRequestAction(webhook)) {
    setupMergeRequestAction(webhook);
  } else if (isNoteAction(webhook)) {
    setupMrNotesAction(webhook);
  } else if (isPipelineAction(webhook)) {
    setupPipelineAction(webhook);
  }
};
