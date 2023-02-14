import { authRoute } from './auth.routes';
import { userRoute } from './user.routes'

export const routes = {
  ...userRoute,
  ...authRoute,
};
