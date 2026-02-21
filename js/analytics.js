export function getTrafficSensorData() {

  // Define cenário aleatório
  const scenario = Math.random();

  let vehicleCount;
  let avgSpeed;

  if (scenario < 0.33) {
    // Fluxo leve
    vehicleCount = Math.floor(Math.random() * 10000) + 5000;
    avgSpeed = Math.floor(Math.random() * 40) + 40; // 40–80 km/h

  } else if (scenario < 0.66) {
    // Fluxo moderado
    vehicleCount = Math.floor(Math.random() * 30000) + 20000;
    avgSpeed = Math.floor(Math.random() * 20) + 20; // 20–40 km/h

  } else {
    // Fluxo pesado
    vehicleCount = Math.floor(Math.random() * 50000) + 50000;
    avgSpeed = Math.floor(Math.random() * 15) + 5; // 5–20 km/h
  }

  return {
    vehicleCount,
    avgSpeed
  };
}