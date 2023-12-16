import { Router, Request, Response } from 'express';
import { AuthController } from './controller'



export class AuthRoutes {

    
    static get  routes(): Router {


        const router = Router();

       const controller = new AuthController();

        router.post('/login', (req:Request, resp:Response) => controller.loginUser(req, resp));
        router.post('/register',(request: Request, response: Response) => controller.registerUser(request, response));

        return router;
    }

}



