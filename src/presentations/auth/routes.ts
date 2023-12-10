import { Router } from 'express';
import { } from './controller'



export class AuthRoutes {

    
    static get  routes(): Router {


        const router = Router();

        router.post('/login', (req, resp) => {
            
            return resp.send('hola')
        })
        router.post('/register',(req, resp) => {
            
            return resp.send('hola')
        })

        return router;
    }

}



