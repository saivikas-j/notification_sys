const getText = (aqi: number | null): string => {
    
    console.log(aqi);
    if(aqi === null || isNaN(aqi)) return '---';
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 200) return "Poor";
    if (aqi <= 300) return "Unhealthy";

    return "Hazardous";
}

  
export default getText;