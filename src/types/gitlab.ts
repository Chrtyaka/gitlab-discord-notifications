import type { MergeRequestAttributes } from './gitlab/merge-requests';
import type { NoteAttributes } from './gitlab/notes';

export type GitLabUser = {
  name: string;
  username: string;
  avatar_url: string;
  id: number;
  email: string;
};

type WebhookObjectKind = 'merge_request' | 'note';
type WebhookEventType = 'merge_request' | 'note';
export type WebhookObjectAttributes = MergeRequestAttributes | NoteAttributes;

export type WebhookBody<T = WebhookObjectAttributes> = {
  object_kind: WebhookObjectKind;
  event_type: WebhookEventType;
  user: GitLabUser;
  object_attributes: T;
};

export type MrWebhookBody = WebhookBody<MergeRequestAttributes>;

export type MrNotesWebhookBody = WebhookBody<NoteAttributes> & {
  merge_request: MergeRequestAttributes;
};
