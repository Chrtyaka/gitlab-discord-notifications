import express from 'express';
import { getConfig } from './app-config';
import bodyParser from 'body-parser';
import { WebhookBody } from './types/gitlab';
import { CustomRequest } from './types/requests';

import { setupAction } from './gitlab';

const app = express();
app.use(bodyParser.json());

const appConfig = getConfig();

const WEBHOOK_RECEIVE_ROUTE = appConfig.get('express:webhookReceiveRoute');
const PORT = appConfig.get('express:port');

app.get(WEBHOOK_RECEIVE_ROUTE, (req, res) => {
  const { url } = req;

  console.log(`Received GET webhook request from ${url}`);
});

app.post(WEBHOOK_RECEIVE_ROUTE, (req: CustomRequest<WebhookBody>, res) => {
  const { body }: { body: WebhookBody } = req;

  console.log({ body });

  setupAction(body);

  return res.send('OK');
});

app.put(WEBHOOK_RECEIVE_ROUTE, (req, res) => {
  const { body } = req;

  console.log(
    `Received PUT webhook request with body: ${JSON.stringify(body)}`,
  );
});

app.delete(WEBHOOK_RECEIVE_ROUTE, (req, res) => {
  const { body } = req;

  console.log(
    `Received DELETE webhook request with body: ${JSON.stringify(body)}`,
  );
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});
