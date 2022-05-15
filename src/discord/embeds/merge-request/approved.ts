import { WebhookMessageOptions } from "discord.js";
import { WebhookBody } from "../../../types/gitlab";
import { MergeRequestAttributes } from "../../../types/gitlab/merge-requests";

export function generateMessageContent(
  webhook: WebhookBody<MergeRequestAttributes>,
): Partial<WebhookMessageOptions> {}
