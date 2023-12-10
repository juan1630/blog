
import { Request, Response } from "express";



export class AuthController {

    // dependencie injection
    constructor() {}


    registerUser = ( req: Request, resp: Response ) =>  {
    
        resp.json('register user controller')
    }

    loginUser = (req: Request, resp: Response) => {
        
    }

}