import { ServerResponse, IncomingMessage } from 'http';

type Response = ServerResponse<IncomingMessage>;

export function provideCORS(response: Response): Response {
  return response
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    .setHeader('Access-Control-Allow-Credentials', 'false')
    .setHeader('Access-Control-Max-Age', '86400')
    .setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept')
    .setHeader('Date', (new Date(Date.now())).toUTCString())
    .setHeader('Server', 'CERN/3.0 libwww/2.17');
}
