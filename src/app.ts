import { Server } from './server/server';




(function(){

    main();

})()


function main() {
    new Server({ port:3100 })
    .start();
}