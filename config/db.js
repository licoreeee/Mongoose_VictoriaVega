import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './variables.env' });

const config = {
    url: process.env.URL_MONGO,
    options: {}
}

export function conectar() {
    try {
        return mongoose.connect(config.url, config.options);
    } catch (error) {
        throw error;
    }
}

export function desconectar() {
    try {
        return mongoose.disconnect();
    } catch (error) {
        throw error;
    }
}

