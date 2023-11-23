interface iUserData {
    email: string;
    roles: { [key: string]: any };
    appliedRoles: { [key: string]: any };
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    sub: boolean;
    areas: string[];
    id: string;
    lastSend: Date;
}

interface iPollutionData {
    recordedAt: Date;
    data: {
        [key: string]: number | null; 
    };
    dataSourceId: string;
}

interface iAQIData {
    [pollutant: string]: {
        [key: string]: string;
    };
}
  

interface iSourceMap {
    [key: string]: string;
}


export { iUserData, iPollutionData, iAQIData, iSourceMap }