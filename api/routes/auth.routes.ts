import { Method } from "../core/enums/method";
import { Route } from "../core/types/route";
import { parseRequestBody } from '../core/utils/parse-request-body';
import { User, UserConstructionData } from '../records/user.record'

export const authRoute: Route = {
  '/auth/login': {
    [Method.Post]: async(req, res) => {
      const body = await parseRequestBody<UserConstructionData>(req);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(body));
      res.end();
    }
  },
  '/auth/register': {
    [Method.Post]: async(req, res) => {
      const body = await parseRequestBody<UserConstructionData>(req);

      const newUser = new User({
        email: body.email,
        password: body.password,
      });

      try {
        await User.addUser(newUser);
        res.end('User has been add');
      } catch(err) {
        res.end('Error(((')
      }
    }
  }
}
