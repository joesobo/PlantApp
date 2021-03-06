const weatherApi = 'https://api.openweathermap.org/data/2.5/onecall?units=imperial&exclude=minutely,hourly,alerts&appid=71b0f89e06a472931c58760879a7a719';

export const getWeatherData = async (lat: number, lon: number) => {
  const res = await fetch(weatherApi + '&lat=' + lat + '&lon=' + lon);
  const json = await res.json();
  console.log(json);

  if (json.cod === 429) {
    return undefined;
  }

  return {
    currentTemp: Math.round(json.current.temp),
    weekTemps: json.daily.map((d: { temp: { day: number; }; }) => {
      return Math.round(d.temp.day)
    })
  };
}