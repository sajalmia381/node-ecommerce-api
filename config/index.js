import dotEnv from 'dotenv';
dotEnv.config();


export const {
    APP_PORT,
    DEBUG_MODE,
    DB_URL,
    SECRET_KEY,
    REFRESH_KEY
} = process.env;