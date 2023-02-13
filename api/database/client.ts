import { Client } from "pg";

import { postgresConfig } from '../config'

export const databaseClient = new Client(postgresConfig);
