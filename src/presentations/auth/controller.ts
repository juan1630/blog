import { Request, Response, response } from "express";
import { UserMysql } from "../../models";
import { Jwt } from '../../config'

export class AuthController {
  public connection: any;

  constructor() {
    this.connection = new UserMysql();
  }

  registerUser = async (req: Request, resp: Response) => {
    try {
      const { name, email, password } = req.body;
      const reponseCreatedUser = await this.connection.createUser({ name, email, password });

  
      if ( !reponseCreatedUser.result ) {
        return resp.status(401).json({ ok: false, error: reponseCreatedUser.error });
      }

      const token = await  new Jwt({ name, email, _id: reponseCreatedUser.insertId }).createToken();
        resp.status(201).json({ token });

    } catch (error) {
      console.log(error);
    }
  };

  loginUser = async (request: Request, response: Response) => {
    try {
      const users = await this.connection.getUsers();
      return response.status(200).json({ users });
    } catch (error) {
      console.log(error);
    }
  };
}
