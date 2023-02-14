import { Method } from "../core/enums/method";
import { Route } from "../core/types/route";
import { parseRequestBody } from '../core/utils/parse-request-body';
import { User, UserConstructionData } from '../records/user.record'
import { Token } from '../records/token.record';
import { sendAuthorizationErrorResponse } from "../core/utils/send-error-response";
import { ServerResponseCode } from '../core/enums/server-response';
import { isEmailValid } from '../core/utils/validators/is-email-valid';

export const authRoute: Route = {
  '/auth/login': {
    [Method.Post]: async(req, res) => {
      const body = await parseRequestBody<UserConstructionData>(req);
      const canAuthorize = await User.checkAuthenticationData(new User(body));
      if (!canAuthorize) {
        sendAuthorizationErrorResponse(
          res,
          ServerResponseCode.BadRequest,
          'general',
          'The authentication data provided is incorrect',
        );

        return;
      }
      const token = Token.emailToToken(body.email);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(token));
      res.end();
    }
  },
  '/auth/register': {
    [Method.Post]: async(req, res) => {
      const body = await parseRequestBody<UserConstructionData>(req);

      if (await User.checkIfUserExists(body.email)) {
        sendAuthorizationErrorResponse(
          res,
          ServerResponseCode.BadRequest,
          'email',
          'A user with this email already exists',
        );

        return;
      }

      const newUser = new User({
        email: body.email,
        password: body.password,
      });

      if (isEmailValid(newUser.email)) {
        sendAuthorizationErrorResponse(
          res,
          ServerResponseCode.BadRequest,
          'email',
          'Invalid email',
        );
        return;
      }

      await User.addUser(newUser);
      const token = Token.emailToToken(newUser.email);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(token));
      res.end();
    }
  },
}
