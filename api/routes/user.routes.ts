import { Method } from "../core/enums/method";
import { ServerResponseCode } from "../core/enums/server-response";
import { Route } from "../core/types/route";
import { User } from "../records/user.record";

export const userRoute: Route = {
  '/users': {
    [Method.Get]: async(req, res) => {
      const users = await User.getAllUsers();

      res.writeHead(ServerResponseCode.OK, { 'Content-Type': 'application/json' })
      res.write(JSON.stringify(users));
      res.end();
    }
  }
}
