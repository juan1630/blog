import { envs ,Bcrypt} from "../config";
import { ConnectMysql } from "../data";
import { User } from "../interfaces";

interface ReponseCreate {
  error: undefined | unknown;
  result: boolean;
  insertId: string | undefined;
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

  async createUser(user: User):Promise <ReponseCreate> {

    try {
      await this.connect();

      const { email, name, password } = user;
      
      const bcrypt = new Bcrypt( password, 10 );
      const passwordHashed = await bcrypt.encryptPassword();

      const [rows] = await this.connection.execute(
        `INSERT INTO users ( name, email, password ) VALUES  ( ?, ? , ? );`,
        [name, email, passwordHashed]
      );
  
      return {error: undefined, insertId: rows.insertId, result:true }; 

    } catch (error) {
      console.log(error)
      return { error, insertId: undefined, result: false  }
    }
  }

  async login( user:User ) {
    try {
      
      const { email, password } = user;

      await this.connect();
      const users = await this.connection.execute(`SELECT * FROM users WHERE email =  '${email} '` );
      console.log(users[0])
      return users[0];
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}
