import api from "./api";

export const numberToRoman = async (number:number):Promise<string> => {
    try {
        const response = await api.get(`math/numberToRoman`, {
            params: {number}
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const romanToNumber = async (numeral:string):Promise<number> => {
    try {
        const response = await api.get(`math/romanToNumber`, {
            params: {numeral}
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}
