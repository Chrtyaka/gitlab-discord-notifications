import { ColorString } from '../config';
import { WebhookBody } from '../gitlab';

export type PipelineAttributes = {
  id: number;
  ref: string;
  tag: boolean;
  sha: string;
  before_sha: string;
  source: string;
  status: PipelineStatus;
  stages: string[];
  created_at: string;
  finished_at: string;
  duration: number;
  queued_duration: number;
  variables: string[];
};

type PipelineStatus =
  | 'created'
  | 'waiting_for_resource'
  | 'preparing'
  | 'pending'
  | 'running'
  | 'success'
  | 'failed'
  | 'canceled'
  | 'skipped'
  | 'manual'
  | 'scheduled';

export type PipelineColors = {
  [key in PipelineStatus]: ColorString;
};


export type PipelineWebhookBody = WebhookBody<PipelineAttributes>;