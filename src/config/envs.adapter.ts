import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    MARIADB_ROOT_PASSWORD: get('MARIADB_ROOT_PASSWORD').required().asString(),
    DB_NAME: get('DB_NAME').required().asString(),
    DB_HOST: get('DB_HOST').required().asString(),
    DB_USER: get('DB_USER').required().asString()
}