import bcrypt from 'bcrypt';


export class Bcrypt {
 
    private password: string;
    private salt: number;

    constructor( passowrd: string, salt:number){
        this.password = passowrd;
        this.salt = salt;
    }

    public async encryptPassword(): Promise<string>{
        try {

            return await bcrypt.hashSync(this.password, this.salt );
            
        } catch (error) {
            console.log(error);
            return `Error ${error}` 
        }
    }

    public async compare(passwordHashed:string) : Promise<boolean> {

        try {
            
            return await bcrypt.compareSync(this.password, passwordHashed);

        } catch (error) {
            console.log(error);
            return false;
        }

    }
    
}

