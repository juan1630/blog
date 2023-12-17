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
      const reponseCreatedUser = await this.connection.createUser({
        name,
        email,
        password,
      });

      if (!reponseCreatedUser) {
        return resp
          .status(401)
          .json({ ok: false, error: "email or password wrong" });
      }
      resp.status(201).json({ token: reponseCreatedUser });
    } catch (error) {
      console.log(error);
    }
  };

  loginUser = async (request: Request, response: Response) => {
    try {
      const { email, password } = request.body;

      const { user, token } = await this.connection.login({ email, password });

      return response.status(200).json({ user, token });
    } catch (error) {
      console.log(error);
    }
  };
}
