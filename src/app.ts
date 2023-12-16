import { Server } from './server/server';
import { AppRoutes } from './presentations/routes';
import { envs } from './config';



(function(){
    main();
})()


function main() {
    new Server({ port: envs.PORT, routes: AppRoutes.routes })
    .start();
}

