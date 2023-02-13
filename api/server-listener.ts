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

  if (url in routes && method in routes[url]) {
    const endpoint = routes[url][method];

    endpoint(req, res);
    return;
  }

  sendErrorResponse(
    res,
    ServerResponseCode.NotFound,
    'Cannot find current endpoint',
  )
}
