export async function getWeatherData() {
  const latitude = -27.64;
  const longitude = -48.67;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=precipitation`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    temperature: data.current_weather.temperature,
    precipitation: data.hourly.precipitation[0]
  };
}