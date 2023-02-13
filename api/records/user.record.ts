import { databaseClient } from "../database/client";

export type UserConstructionData = User;

export class User {

  public readonly id?: number;

  public readonly email: string;

  public readonly password: string;

  public constructor({ email, password, id }: UserConstructionData) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  static async getAllUsers(): Promise<readonly User[]> {
    const { rows } = await databaseClient.query<User>('SELECT * FROM users');

    return rows;
  }

  static async addUser(user: User) {
    await databaseClient.query(
      `INSERT INTO users (email, password) VALUES ($1, $2)`,
      [user.email, user.password]
    );
  }
}
