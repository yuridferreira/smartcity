// ==============================
// 🌦 CLIMA - Open Meteo
// ==============================
export async function getWeatherData(latitude, longitude) {

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=precipitation`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao buscar dados de clima");
  }

  const data = await response.json();

  return {
    temperature: data.current_weather.temperature,
    precipitation: data.hourly?.precipitation?.[0] ?? 0
  };
}


// ==============================
// 🛣 TRÁFEGO - OSRM (OpenStreetMap)
// ==============================
export async function getTrafficFromOSRM(latitude, longitude) {

  const lat2 = latitude + 0.002;
  const lon2 = longitude + 0.002;

  const url = `https://router.project-osrm.org/route/v1/driving/${longitude},${latitude};${lon2},${lat2}?overview=false`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao buscar dados de rota");
  }

  const data = await response.json();

  if (!data.routes || data.routes.length === 0) {
    throw new Error("Sem dados de rota disponíveis");
  }

  const route = data.routes[0];

  const distanceKm = route.distance / 1000;
  const durationHours = route.duration / 3600;
  const avgSpeed = distanceKm / durationHours;

  return {
    avgSpeed: Math.round(avgSpeed),
    distanceKm: distanceKm.toFixed(2),
    durationMin: (route.duration / 60).toFixed(1)
  };
}