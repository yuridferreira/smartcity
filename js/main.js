import { getWeatherData } from "./api.js";
import { getTrafficSensorData } from "./sensores.js";
import { analyzeTraffic } from "./analytics.js";
import { saveRawData, saveAnalyticsData } from "./storage.js";
import { exportToJSON } from "./export.js";

document.addEventListener("DOMContentLoaded", () => {

  console.log("✅ Main carregado");

  // ==============================
  // 📍 Função localização
  // ==============================
  function getUserLocation() {
    return new Promise((resolve, reject) => {

      if (!navigator.geolocation) {
        reject("Geolocalização não suportada.");
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => {
          reject("Permissão negada ou erro.");
        }
      );
    });
  }

  // ==============================
  // 🚦 Botão consultar
  // ==============================
  const btnConsultar = document.getElementById("btnConsultar");
  const btnExportar = document.getElementById("btnExportar");

  if (btnConsultar) {
    btnConsultar.addEventListener("click", async () => {

      try {

        const location = await getUserLocation();

        const weather = await getWeatherData(
          location.latitude,
          location.longitude
        );

        const traffic = getTrafficSensorData();

        saveRawData({
          location,
          weather,
          traffic,
          timestamp: new Date()
        });

        const analysis = analyzeTraffic(weather, traffic);

        saveAnalyticsData({
          ...analysis,
          timestamp: new Date()
        });

        document.getElementById("resultado").innerHTML = `
          <strong>📍 Localização:</strong><br>
          Lat: ${location.latitude.toFixed(4)}<br>
          Lon: ${location.longitude.toFixed(4)}<br><br>

          <strong>🌦 Clima:</strong><br>
          Temperatura: ${weather.temperature}°C<br>
          Precipitação: ${weather.precipitation} mm<br><br>

          <strong>🚗 Sensores:</strong><br>
          Veículos/h: ${traffic.vehicleCount}<br>
          Velocidade média: ${traffic.avgSpeed} km/h<br><br>

          <strong>📊 Análise:</strong><br>
          Capacidade real: ${analysis.realCapacity} veículos/h<br>
          Saturação: ${analysis.saturation}<br>
          Atraso médio: ${analysis.averageDelay} s<br>
          <strong>Nível de risco: ${analysis.riskLevel}</strong>
        `;

      } catch (error) {
        console.error(error);
        document.getElementById("resultado").innerHTML =
          "⚠ Permissão de localização necessária.";
      }

    });
  }

  // ==============================
  // 📥 Botão exportar
  // ==============================
  if (btnExportar) {
    btnExportar.addEventListener("click", () => {
      exportToJSON();
    });
  }

});