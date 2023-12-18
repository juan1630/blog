
import { Router, Request, Response } from 'express';

export class PostsRouter {

    static get routes(): Router {
        const router = Router();

        router.post('/post', (request:Request, response: Response) => {
          return response.status(201).json({x:'ingresa'});
        });

        router.get('/posts',(request:Request, response: Response) => {
            return response.status(201).json({x:'get'});
          })
        
        return router;
    }

}

