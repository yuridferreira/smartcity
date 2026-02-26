import { getWeatherData, getTrafficFromOSRM } from "./api.js";
import { analyzeTraffic } from "./analytics.js";
import { saveRawData, saveAnalyticsData } from "./storage.js";
import { exportToJSON } from "./export.js";

document.addEventListener("DOMContentLoaded", () => {

  console.log("✅ Main carregado");

  const btnConsultar = document.getElementById("btnConsultar");
  const btnExportar = document.getElementById("btnExportar");
  const dashboard = document.getElementById("dashboard");
  const riskContainer = document.getElementById("riskContainer");

  // ==============================
  // 📍 Função Geolocalização
  // ==============================
  function getUserLocation() {
    return new Promise((resolve, reject) => {

      if (!navigator.geolocation) {
        reject("Geolocalização não suportada.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          reject("Permissão negada ou erro ao obter localização.");
        }
      );
    });
  }

  // ==============================
  // 🚦 BOTÃO CONSULTAR
  // ==============================
  if (btnConsultar) {
    btnConsultar.addEventListener("click", async () => {

      try {

        dashboard.innerHTML = "⏳ Consultando dados...";
        riskContainer.innerHTML = "";

        const location = await getUserLocation();

        const weather = await getWeatherData(
          location.latitude,
          location.longitude
        );

        const traffic = await getTrafficFromOSRM(
          location.latitude,
          location.longitude
        );

        // Salvar dados brutos
        saveRawData(weather, traffic);

        // Analisar
        const analysis = analyzeTraffic(weather, traffic);

        // Salvar análise
        saveAnalyticsData(analysis);

        // ==============================
        // 🖥️ Renderização Dashboard
        // ==============================
        dashboard.innerHTML = `
          <div class="card">
            <h3>📍 Localização</h3>
            <p>Lat: ${location.latitude.toFixed(4)}</p>
            <p>Lon: ${location.longitude.toFixed(4)}</p>
          </div>

          <div class="card">
            <h3>🌦 Clima</h3>
            <p>Temperatura: ${weather.temperature}°C</p>
            <p>Precipitação: ${weather.precipitation} mm</p>
          </div>

          <div class="card">
            <h3>🚗 Tráfego</h3>
            <p>Velocidade média: ${traffic.avgSpeed} km/h</p>
            <p>Tempo estimado: ${traffic.durationMin} min</p>
            <p>Distância analisada: ${traffic.distanceKm} km</p>
         </div>

          <div class="card">
            <h3>📊 Análise</h3>
            <p>Saturação: ${analysis.saturation}</p>
            <p>Atraso médio: ${analysis.averageDelay}s</p>
          </div>
        `;

        // ==============================
        // 🔴 Indicador de Risco
        // ==============================
        riskContainer.innerHTML = `
          <div class="risk ${analysis.riskLevel}">
            NÍVEL DE RISCO: ${analysis.riskLevel}
          </div>
        `;

      } catch (error) {
        console.error(error);

        dashboard.innerHTML = "⚠ Erro ao consultar dados.";
        riskContainer.innerHTML = "";
      }

    });
  }

  // ==============================
  // 📥 BOTÃO EXPORTAR
  // ==============================
  if (btnExportar) {
    btnExportar.addEventListener("click", () => {
      exportToJSON();
    });
  }

});