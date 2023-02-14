import { Validator } from '../../types/validator';

export const hasAuthenticationData: Validator = (reqBody) =>
  'email' in reqBody && 'password' in reqBody
