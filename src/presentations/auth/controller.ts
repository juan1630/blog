import { Request, Response, response } from "express";
import { UserMysql } from "../../models";

export class AuthController {
  public connection: any;

  constructor() {
    this.connection = new UserMysql();
  }

  registerUser = async (req: Request, resp: Response) => {
    try {
      const { name, email, password } = req.body;
      const userCreated = this.connection.createUser({ name, email, password });
      if (userCreated) {
        resp.status(201).json({ user: userCreated });
      }
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
