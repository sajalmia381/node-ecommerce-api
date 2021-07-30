import dotEnv from 'dotenv';
dotEnv.config();


export const {
    APP_PORT,
    DEBUG_MODE,
    DB_URL,
    JWT_SECRET_KEY
} = process.env;