import { envs ,Bcrypt, Jwt} from "../config";
import { ConnectMysql } from "../data";
import { User } from "../interfaces";

interface ReponseCreate {
  error: null | unknown;
  result: boolean;
  token: string | null;
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

  async createUser(user: User):Promise <ReponseCreate | undefined> {

    try {
      await this.connect();

      const { email, name, password } = user;
      
      const bcrypt = new Bcrypt( password, 10 );
      const passwordHashed = await bcrypt.encryptPassword();

      const [rows] = await this.connection.execute(
        `INSERT INTO users ( name, email, password ) VALUES  ( ?, ? , ? );`,
        [name, email, passwordHashed]
      );

      console.log(rows,"rows")
      if( rows.insertId > 0  ){

        const token = await new Jwt({ name, email, _id: rows.insertId }).createToken();
        return {error: null, token, result:true }; 
      }  

    } catch (error) {
      console.log(error)
     // return { error, token: null, result: false  }
    }
  }

  async login( userBody:User ) {
    try {
      
      const { email, password } = userBody;
      await this.connect();

      const [ user ] = await this.connection.execute(`SELECT * FROM users WHERE email =  '${email} '` );
  
      const bcrypt = new Bcrypt( password, 10 );
      const passowrdCompared = await bcrypt.compare( user[0].password );

      if( passowrdCompared ){
        const token = await new Jwt({ _id: user[0].id, email, name: user[0].name }).createToken();
        return {
          user: user[0],
          token
        };
      }

      return {
        user:null,
        token:null
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}
