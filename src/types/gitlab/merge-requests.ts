import { ColorString } from "../config";

type MergeRequestAction = 'open' | 'close' | 'merge' | 'reopen' | 'approved';

export type MergeRequestAttributes = {
  id: number;
  target_branch: string;
  source_branch: string;
  source_project_id: number;
  author_id: number;
  assignee_id: number;
  title: string;
  created_at: string;
  updated_at: string;
  milestone_id: null | number;
  state: string;
  blocking_discussions_resolved: boolean;
  merge_status: string;
  target_project_id: number;
  iid: number;
  description: string;
  source: MergeRequestSource;
  action: MergeRequestAction;
  url: string;
};

type MergeRequestSource = {
  name: string;
  description: string;
  web_url: string;
  avatar_url: null | string;
  git_ssh_url: string;
  git_http_url: string;
  namespace: string;
  visibility_level: number;
  path_with_namespace: string;
  default_branch: string;
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
};

export type MergeRequestColors = {
  open: ColorString;
  close: ColorString;
  merge: ColorString;
  approved: ColorString;
};
