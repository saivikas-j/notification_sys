import axios from 'axios';
import {authServiceUrl, config } from "../urls";

export const changeLastSend = async (userId : string, newLastSend: Date, ) => {
    try {
        const response = await axios.post( authServiceUrl+ `/change-lastSend`, {"userId": userId, "newLastSend":newLastSend }, config);
        const responseData = {
            type: "success",
            data: response.data,
            status: response.status
        }
        return responseData;
    }
    catch (e: any) {
        const responseData = {
            type: "error",
            data: e.response.data.errors,
            status: e.response.status
        }
        console.log(e);
        return responseData;
    }
}
