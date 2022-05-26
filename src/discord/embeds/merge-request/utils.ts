import { MergeRequestColors } from '../../../types/gitlab/merge-requests';
import { getConfig } from '../../../app-config';
import { ColorString } from '../../../types/config';

const APP_CONFIG = getConfig();

export function getEmbedColor(
  mergeRequestState: keyof MergeRequestColors,
): ColorString {
  const colors: MergeRequestColors = APP_CONFIG.get('colors:mergeRequests');

  return colors[mergeRequestState];
}
