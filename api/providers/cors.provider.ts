import { ServerResponse, IncomingMessage } from 'http';

type Response = ServerResponse<IncomingMessage>;

export function provideCORS(response: Response): Response {
  return response
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Date', (new Date(Date.now())).toUTCString())
    .setHeader('Server', 'CERN/3.0 libwww/2.17');
}
