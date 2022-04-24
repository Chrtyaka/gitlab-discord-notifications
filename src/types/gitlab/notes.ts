import { ColorString } from '../config';

export type NoteAttributes = {
  attachment: unknown;
  author_id: number;
  change_position: unknown;
  commit_id: string;
  created_at: string;
  discussion_id: string;
  id: number;
  line_code: number;
  note: string;
  noteable_id: number;
  noteable_type: string;
  original_position: unknown;
  position: unknown;
  project_id: number;
  resolved_at: string;
  resolved_by_id: number;
  resolved_by_push: unknown;
  st_diff: number;
  system: boolean;
  type: string;
  updated_at: string;
  updated_by_id: number;
  description: string;
  url: string;
};

export type NoteColors = {
  add: ColorString;
};
