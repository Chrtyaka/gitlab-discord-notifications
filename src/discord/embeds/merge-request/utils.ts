import { MergeRequestColors } from '../../../types/gitlab/merge-requests';
import { getConfig } from '../../../app-config';

const APP_CONFIG = getConfig();

export function getEmbedColor(mergeRequestState: keyof MergeRequestColors) {
  const colors: MergeRequestColors = APP_CONFIG.get('colors:mergeRequests');

  return colors[mergeRequestState];
}
