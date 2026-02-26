export function analyzeTraffic(weather, traffic) {

  const idealSpeed = 60; // km/h ideal urbano

  // Índice baseado em redução de velocidade
  const speedFactor = traffic.avgSpeed / idealSpeed;

  // Ajuste climático
  let weatherFactor = 1;

  if (weather.precipitation > 0) {
    weatherFactor -= 0.2;
  }

  if (weather.temperature > 35) {
    weatherFactor -= 0.1;
  }

  const saturation = (1 - speedFactor) * weatherFactor;

  let riskLevel = "BAIXO";

  if (saturation > 0.7) riskLevel = "ALTO";
  else if (saturation > 0.4) riskLevel = "MÉDIO";

  return {
    saturation: saturation.toFixed(2),
    averageDelay: Math.max(0, (idealSpeed - traffic.avgSpeed) * 2).toFixed(0),
    riskLevel
  };
}