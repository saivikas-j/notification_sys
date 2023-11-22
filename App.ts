import { sendMail } from "./services/sendMail";
import calculateAQI from "./services/calculateAQI";
import { getAllUserData } from "./api/getAllUsers";
import { getAllLatestData } from "./api/getLatestData";
import { getDataSourceMappingAPi } from "./api/getMapping";
import getText from "./services/getText";
import { iUserData, iPollutionData, iSourceMap, iAQIData } from "./dataInterfaces";

const App = async () => {
    const AQIparams = ["PM2.5", "PM10"];
    const removeSpecialCharacters = (input: string) => {
        return input.replace(/[^a-zA-Z0-9]/g, '');
    }
    const currDate = new Date();

    const mappingPromise = await getDataSourceMappingAPi();
    const mapping: iSourceMap = mappingPromise.data;

    const allUsersPromise = await getAllUserData();
    const allUsers: iUserData[] = allUsersPromise.data;

    // const latestDataPromise = await getAllLatestData();
    // const latestData: iPollutionData[] = latestDataPromise.data;

    const latestData: iPollutionData[] = [
        {
          recordedAt: new Date(),
          data: {
            NO2: 15,
            SO2: 9,
            PM10: null,
            O3: 15,
            CO: 0.09,
            PM25: 120,
            Pb: null,
            AQI: 68
          },
          dataSourceId: '2'
        },
        {
          recordedAt: new Date(),
          data: {
            NO2: 14,
            PM25: 32,
            Pb: null,
            AQI: 73,
            SO2: 10,
            PM10: 73,
            O3: 15,
            CO: 0.09
          },
          dataSourceId: '4'
        },
        {
          recordedAt: new Date(),
          data: {
            SO2: 2,
            PM10: 51,
            O3: 0,
            CO: 0,
            NO2: 25,
            PM25: 13,
            Pb: 0,
            AQI: 51
          },
          dataSourceId: '16'
        },
        {
          recordedAt: new Date(),
          data: {
            SO2: 25,
            PM10: 60.2,
            O3: 40,
            CO: null,
            NO2: 20,
            Pb: 22,
            AQI: null
          },
          dataSourceId: '5'
        }
    ]

    console.log(allUsers);

    const AQIDetails: iAQIData = {};
    for(let i = 0; i < latestData.length; i++)
    {
        let tempLoc = mapping[latestData[i].dataSourceId];
        let tempAQI: {[key: string]: string} = {};

        const recordedAtDate = new Date(latestData[i].recordedAt);
        if (recordedAtDate instanceof Date) {
            if((recordedAtDate.getDate() - currDate.getDate()) === 0 && (recordedAtDate.getMonth() - currDate.getMonth()) === 0 && (recordedAtDate.getFullYear() - currDate.getFullYear()) === 0)
            {
                for(let j = 0; j < AQIparams.length; j++)
                    tempAQI[AQIparams[j]] = getText(calculateAQI(latestData[i].data[removeSpecialCharacters(AQIparams[j])], removeSpecialCharacters(AQIparams[j])));

                AQIDetails[tempLoc] = tempAQI;
                
            }
        }
    }

    console.log(AQIDetails)

    for(let i = 0; i < allUsers.length; i++)
    {
        const filteredAQI: iAQIData = {};

        for (const key of allUsers[i].areas) 
            if (AQIDetails.hasOwnProperty(key))
                filteredAQI[key] = AQIDetails[key];
        
        console.log(filteredAQI);

        if(allUsers[i].sub && Object.keys(filteredAQI).length > 0)
            await sendMail(allUsers[i], filteredAQI, currDate, AQIparams);
    }

}

App();