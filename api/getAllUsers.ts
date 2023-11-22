import axios from "axios";
import {pollutionServiceUrl, authServiceUrl, config} from "../urls";


export const getAllUserData = async () => {
    try {
        const response = await axios.get(`${authServiceUrl}/all-users`, config);

        const responseData = {
            type: "success",
            data: response.data,
            status: response.status
        }
        return responseData;
    }
    catch (err : any) {
        const responseData = {
            type: "error",
            data: err.response.data.errors,
            status: err.response.status
        }
        console.log("In error block :",responseData);
        return responseData;
    }
}
