import { getConfig } from '../../../app-config';
import { ColorString } from '../../../types/config';
import { PipelineColors } from '../../../types/gitlab/pipelines';

const APP_CONFIG = getConfig();

export function getEmbedColor(
  pipelineStatus: keyof PipelineColors,
): ColorString {
  const colors: PipelineColors = APP_CONFIG.get('colors:pipelines');

  return colors[pipelineStatus] || '#ffffff';
}

export function generatePipelineUrl(
  pipelineId: number,
  projectUrl: string,
): string {
  return `${projectUrl}/pipelines/${pipelineId}`;
}
