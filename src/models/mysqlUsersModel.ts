import { envs } from "../config";
import { ConnectMysql } from "../data";

interface User {
  name: string;
  email: string;
  password: string;
}

export class UserMysql {
  private connection: any;

  constructor() {}

  private async connect() {
    try {
      this.connection = await new ConnectMysql({
        database: envs.DB_NAME,
        host: envs.DB_HOST,
        user: envs.DB_USER,
        password: envs.MARIADB_ROOT_PASSWORD,
      }).connectToMysql();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createUser(user: User) {
    await this.connect();

    const { email, name, password } = user;

    const [rows] = await this.connection.execute(
      `INSERT INTO users ( name, email, password ) VALUES  ( ?, ? , ? );`,
      [name, email, password]
    );

    return rows.insertId;
  }

  async getUsers() {
    try {
      await this.connect();

      const users = await this.connection.execute("SELECT * FROM users");
      return users;
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}
