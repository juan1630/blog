import { Server } from './server/server';
import { AppRoutes } from './presentations/routes'



(function(){
    main();
})()


function main() {
    new Server({ port:3100, routes: AppRoutes.routes })
    .start();
}

