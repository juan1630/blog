import Mysql2 from "mysql2/promise";
import bluebird from 'bluebird'

interface DataToConnect {
  host: string;
  user: string;
  database: string;
  password: string;
}

export class ConnectMysql {

  public host: string;
  public user: string;
  public dataBase: string;
  public password: string;
  public connection: any;

  constructor(options: DataToConnect) {
    const { database, host, password, user } = options;
    this.dataBase = database;
    this.host = host;
    this.password = password;
    this.user = user;
    this.connection = null;
  }

  async connectToMysql() {
    try {

        this.connection = await Mysql2.createConnection({
            host:this.host,
            database: this.dataBase,
            password: this.password,
            user: this.user,
            Promise: bluebird
        });

        return this.connection;
    } catch (error) {
      console.log(error);
    }
  }

  getConnection() {
    return this.connection;
  }

}
