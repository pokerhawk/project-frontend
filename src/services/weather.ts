import api from "./api";

export type weatherResponseProps = {
    city: string;
    region: string;
    country: string;
    callsLeft: number;
    cloud: string;
    coldWindTemp: string;
    feelsLikeTemp: string;
    humidity: string;
    icon: string;
    lowTemperature: string;
    maxTemperature: string;
    temperature: string;
    title: string;
    windSpeed: string;
}

export const weatherByCity = async (city:string):Promise<weatherResponseProps> => {
    try {
        const response = await api.get(`externalApi/getWeatherByCity`, {
            params: {city}
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
