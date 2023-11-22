const  interpolate = (value: number, sourceMin: number, sourceMax: number, destMin: number, destMax: number) => {
    const proportion = (value - sourceMin) / (sourceMax - sourceMin);
    const mappedValue = destMin + proportion * (destMax - destMin);
    return mappedValue;
}


const calculateAQI = (value: number | null, pollutant: string) => {

    if(value === null || isNaN(value))
        return null;
    
    switch(pollutant) {
        case "PM25":
            if (value <= 30 && value >= 0) return interpolate(value, 0, 30, 0, 50);
            if (value <= 60 && value >= 31) return interpolate(value, 31, 60, 51, 100);
            if (value <= 90 && value >= 61) return interpolate(value, 61, 90, 101, 200);
            if (value <= 120 && value >= 91) return interpolate(value, 91, 120, 201, 300);
            if (value <= 250 && value >= 121) return interpolate(value, 121, 250, 301, 400);
            if (value > 250) return (500-401) * interpolate(value, 251, 1000, 401, 500);
            return value;
        case "PM10":
            if (value <= 50 && value >= 0) return value;
            if (value <= 100 && value >= 51) return value;
            if (value <= 250 && value >= 101) return interpolate(value, 101, 250, 101, 200);
            if (value <= 350 && value >= 251) return interpolate(value, 251, 3250, 201, 300);
            if (value <= 430 && value >= 351) return interpolate(value, 351, 430, 301, 400);
            if (value > 430) return interpolate(value, 431, 1000, 401, 500);
        default:
            return null;
    }
};

export default calculateAQI;