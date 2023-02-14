import { Method } from "../core/enums/method";
import { ServerResponseCode } from "../core/enums/server-response";
import { Route } from "../core/types/route";
import { sendAuthorizationErrorResponse } from "../core/utils/send-error-response";
import { Token } from "../records/token.record";
import { User } from "../records/user.record";

export const userRoute: Route = {
  '/users/': {
    [Method.Get]: async(req, res) => {
      const users = await User.getAllUsers();

      res.writeHead(ServerResponseCode.OK, { 'Content-Type': 'application/json' })
      res.write(JSON.stringify(users));
      res.end();
    },
  },
  '/users/profile/': {
    [Method.Get]: async(req, res) => {
      console.log(JSON.stringify(req.headers, null, 2));
      const authToken = req.headers.authorization;

      if (!authToken) {
        sendAuthorizationErrorResponse(
          res,
          ServerResponseCode.Unauthorized,
          'authorization',
          'Cannot read authorization header',
        );

        return;
      }

      const token = new Token(req.headers.authorization);

      const emailFromToken = Token.tokenToEmail(token);

      try {
        const { email, id } = await User.getUserByEmail(emailFromToken);

        res.writeHead(ServerResponseCode.OK, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ email, id }));
        res.end();
      } catch(err) {
        sendAuthorizationErrorResponse(
          res,
          ServerResponseCode.BadRequest,
          'authorization',
          'Invalid authorization token',
        );
      }
    },
    [Method.Options]: async(req, res) => {
      console.log(JSON.stringify(req.headers, null, 2));
      res.end();
    },
  }
}
