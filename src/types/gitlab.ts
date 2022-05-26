import type { MergeRequestAttributes } from './gitlab/merge-requests';
import type { NoteAttributes } from './gitlab/notes';
import { PipelineAttributes } from './gitlab/pipelines';

export type GitLabUser = {
  name: string;
  username: string;
  avatar_url: string;
  id: number;
  email: string;
};

type WebhookObjectKind = 'merge_request' | 'note' | 'pipeline';
type WebhookEventType = 'merge_request' | 'note' | 'pipeline';
export type WebhookObjectAttributes =
  | MergeRequestAttributes
  | NoteAttributes
  | PipelineAttributes;

export type WebhookBody<T = WebhookObjectAttributes> = {
  object_kind: WebhookObjectKind;
  event_type: WebhookEventType;
  user: GitLabUser;
  object_attributes: T;
  project: GitlabProject;
};

export type GitlabProject = {
  id: number;
  name: string;
  description: string;
  web_url: string;
  avatar_url: string;
  git_ssh_url: string;
  git_http_url: string;
  namespace: string;
  visibility_level: number;
  path_with_namespace: string;
  default_branch: string;
  ci_config_path: string;
};

export type MrWebhookBody = WebhookBody<MergeRequestAttributes>;

export type MrNotesWebhookBody = WebhookBody<NoteAttributes> & {
  merge_request: MergeRequestAttributes;
};
