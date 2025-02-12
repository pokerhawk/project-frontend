import api from './api';

type LoginRequestProps = {
    email: string;
    password: string;
    code: string;
}

type RegisterRequestProps = {
    name: string;
    email: string;
    password: string;
}

export const COOKIE_ACCESS_TOKEN = 'cookie_access_token';
export const COOKIE_REFRESH_TOKEN = 'cookie_refresh_token';

export const loginRequest = async ({ email, password, code }: LoginRequestProps) => {
    try {
        const { data } = await api.post('/auth/login', { email, password, code });
        return data;
    } catch (err) {
        throw err;
    }
}

export const isMfaEnabledRequest = async (email: string) => {
    try {
        const { data } = await api.get(`/auth/isAuthenticated?email=${email}`);
        return data;
    } catch(err){
        throw err;
    }
}

export const registerRequest = async ({ name, email, password }:RegisterRequestProps) => {
    try {
        const { data } = await api.post('/auth/register', { name, email, password });
        return data;
    } catch (err) {
        throw err;
    }
}

export const updateUserCommission = async (id:string, commission: number) => {
    try {
        const { data } = await api.patch(`/auth/updateUserCommission`, {
            params: {id, commission}
        })
        return data;
    } catch (error) {
        throw error;
    }
}
