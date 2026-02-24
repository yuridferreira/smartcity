export async function getWeatherData(latitude, longitude) {

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=precipitation`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    temperature: data.current_weather.temperature,
    precipitation: data.hourly.precipitation[0]
  };
}