import jwt from 'jsonwebtoken';
import { envs } from './envs.adapter';


interface Token {
    name:string;
    email:string;
    _id: string;
}

export class Jwt {

    private name: string;
    private email: string;
    private _id: string;

    constructor( options: Token ){

        const { name, email, _id } = options;

        this.name = name;
        this.email = email;
        this._id = _id;

    }

   async createToken(){
       const token = await jwt.sign({name:this.name, email: this.email, _id:this._id  }, envs.SEED_SECRET);
       return token;
    }
}

