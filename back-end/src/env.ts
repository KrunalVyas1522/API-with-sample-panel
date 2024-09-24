import * as dotenv from 'dotenv';

dotenv.config();
export const env = {
    PORT : process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt((process.env.DB_PORT)) || 5432,
    DB_USER_NAME: process.env.DB_USER_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_TYPE: process.env.DB_TYPE,
}