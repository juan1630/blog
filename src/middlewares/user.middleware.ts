import { Request, Response , NextFunction} from 'express';
import { Valid } from '../validations'

export const validateUser = async(request: Request, response: Response, next : NextFunction ) => {

    
    const result   =  await  Valid(request.body);
    
    if( result?.result ){
        next();
        return
    }

    return response.status(401).json({ok:false, error: result?.error });

}


