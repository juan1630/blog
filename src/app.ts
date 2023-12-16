import { Server } from './server/server';
import { AppRoutes } from './presentations/routes';
import { envs } from './config'
import { ConnectMysql } from './data';



(function(){
    main();
})()


function main() {
    new Server({ port: envs.PORT, routes: AppRoutes.routes })
    .start();

    new ConnectMysql({ database: envs.DB_NAME, host: envs.DB_HOST, user: envs.DB_USER, password: envs.MARIADB_ROOT_PASSWORD })
    .connectToMysql();
}

