import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { PostsRouter } from './post/routes'



export class AppRoutes {

    
    static get  routes(): Router {


        const router = Router();

        router.use('/api/auth/', AuthRoutes.routes);
        router.use('/api/', PostsRouter.routes );

        return router;
    }

}



