import axios from 'axios';
import {pollutionServiceUrl, config} from "../urls";

export const getAllLatestData = async () => {
    try {
        const response = await axios.get('http://localhost:3002/api/pollution/dashboard/latestData', config);
        const responseData = {
            type: "success",
            data: response.data,
            status: response.status
        }
        return responseData;
    }
    catch (e : any) {
        const responseData = {
            type: "error",
            data: e.response.data.errors,
            status: e.response.status
        }
        console.log(e);
        return responseData;
    }
}
