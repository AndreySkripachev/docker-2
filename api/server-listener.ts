import { ServerResponse, IncomingMessage } from 'http';
import { Method } from './core/enums/method';

import { provideCORS } from './providers/cors.provider';
import { routes } from './routes'
import { sendErrorResponse } from './core/utils/send-error-response'
import { ServerResponseCode } from './core/enums/server-response';

export function serverListener(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
): void {
  res = provideCORS(res);

  const method = req.method as Method ?? Method.Get;
  const url = req.url;

  console.log(method, url);

  if (url in routes && method in routes[url]) {
    const route = routes[url][method];

    route(req, res);
    return;
  }

  sendErrorResponse(
    res,
    ServerResponseCode.NotFound,
    'Cannot find current route',
  )
}
