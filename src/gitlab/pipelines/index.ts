import { WebhookBody } from '../../types/gitlab';
import { PipelineAttributes } from '../../types/gitlab/pipelines';
import { onFailed } from './failed';

export const setupPipelineAction = (
  action: WebhookBody<PipelineAttributes>,
) => {
  switch (action.object_attributes.status) {
    case 'failed':
      onFailed(action);
      break;
    default:
      break;
  }
};
