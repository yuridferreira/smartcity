export function analyzeTraffic(weather, traffic) {

  // Cruzamento: 2 faixas
  const baseCapacityPerLane = 1800;
  const lanes = 2;

  let realCapacity = baseCapacityPerLane * lanes;

  // Redução se estiver chovendo
  if (weather.precipitation > 0) {
    realCapacity *= 0.8;
  }

  // Densidade
  const density = traffic.vehicleCount / traffic.avgSpeed;

  // Saturação
  const saturation = traffic.vehicleCount / realCapacity;

  let riskLevel;
  let averageDelay;

  if (saturation < 0.7) {
    riskLevel = "BAIXO";
    averageDelay = 10;
  } 
  else if (saturation < 1) {
    riskLevel = "MÉDIO";
    averageDelay = 30;
  } 
  else {
    riskLevel = "ALTO";
    averageDelay = 60;
  }

  return {
    realCapacity: Math.round(realCapacity),
    saturation: saturation.toFixed(2),
    averageDelay,
    riskLevel,
    density: density.toFixed(2)
  };
}