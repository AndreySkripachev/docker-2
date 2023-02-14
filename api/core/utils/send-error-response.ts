import { ServerResponse } from 'http';
import { ServerResponseCode } from '../enums/server-response';

const MAP_ERROR_CODE_TO_MESSAGE: Readonly<Partial<Record<ServerResponseCode, string>>> = {
  [ServerResponseCode.BadRequest]: 'Bad request',
  [ServerResponseCode.Forbidden]: 'Forbidden',
  [ServerResponseCode.Unauthorized]: 'Unauthorized',
  [ServerResponseCode.NotFound]: 'Not found',
}

export function sendErrorResponse(
  res: ServerResponse,
  code: ServerResponseCode,
  message: string,
): void {
  res.writeHead(code, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify({
    data: MAP_ERROR_CODE_TO_MESSAGE[code],
    detail: message,
  }))
  res.end();
}

export function sendAuthorizationErrorResponse(
  res: ServerResponse,
  code: ServerResponseCode,
  field: string,
  message: string,
): void {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({
    data: MAP_ERROR_CODE_TO_MESSAGE[code],
    detail: {
      [field]: message,
    }
  }));
  res.end();
}
