import { IncomingMessage, ServerResponse } from "http"
import { Method } from "../enums/method";

export interface Route {
  readonly [K: string]: {
    [M in Method]?:
      (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void
  }
};
