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
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [user.email, user.password]
    );
  }

  static async checkIfUserExists(email: User['email']): Promise<boolean> {
    const query = await databaseClient.query(
      'SELECT * FROM users WHERE email=$1',
      [email],
    );

    return query.rowCount > 0;
  }

  static async checkAuthenticationData(user: User): Promise<boolean> {
    const query = await databaseClient.query(
      'SELECT * FROM users WHERE email=$1 AND password=$2',
      [user.email, user.password],
    );

    return query.rowCount > 0;
  }

  static async getUserByEmail(email: User['email']): Promise<User> {
    const query = await databaseClient.query<User>(
      'SELECT * FROM users WHERE email=$1 LIMIT 1',
      [email],
    );

    return new User(query.rows[0]);
  }
}
