import api from "./api";
import { UserProps } from "../types/User";

export const CreateUser = async (
    name:string, document:string, birthDate:string, email:string, password:string
    ) => {
    try {
        const response = await api.post(`/user/create`,
            {name, email, password, birthDate, document}
        )
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUsers = async (id?: string):Promise<UserProps> => {
    try {
        const response = await api.get(`/user/byId?userId=${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (body: UserProps) => {
    try {
        const response = await api.post(`/user/update`, {...body})
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getSellersList = async (rows:number, page:number) => {
    try {
        const response = await api.get(`/user/sellersList`, {
            params: {rows, page}
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUser = async (id:any) => {
    try {
        const response = await api.get(`/user/getOne`, {
            params: {id}
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}
