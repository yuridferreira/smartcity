import { getWeatherData } from './api.js';
import { getTrafficSensorData } from './sensors.js';
import { analyzeTraffic } from './analytics.js';
import { saveRawData, saveAnalyticsData } from './storage.js';
import { exportToJSON } from './export.js';

// ===== BOTÃO CONSULTAR =====
document.getElementById("btnConsultar")
  .addEventListener("click", async () => {

    try {

      // 1️⃣ Coleta dados
      const weather = await getWeatherData();
      const traffic = getTrafficSensorData();

      console.log("Clima:", weather);
      console.log("Tráfego:", traffic);

      // 2️⃣ Salva dados brutos (Data Lake)
      saveRawData(weather, traffic);

      // 3️⃣ Processa análise
      const analysis = analyzeTraffic(weather, traffic);

      console.log("Análise:", analysis);

      // 4️⃣ Salva resultado analítico
      saveAnalyticsData(analysis);

      // 5️⃣ Exibe resultado na interface
      document.getElementById("resultado").innerHTML = `
        <h3>🚦 Cruzamento Urbano - 2 Faixas / 2 Semáforos</h3>

        🌡 Temperatura: ${weather.temperature}°C <br>
        🌧 Precipitação: ${weather.precipitation} mm <br><br>

        🚗 Fluxo estimado: ${traffic.vehicleCount} veículos/h <br>
        🏎 Velocidade média: ${traffic.avgSpeed} km/h <br><br>

        📊 Capacidade real da via: ${analysis.realCapacity} veículos/h <br>
        📈 Taxa de saturação: ${analysis.saturation} <br>
        ⚙ Densidade ajustada: ${analysis.density} <br>
        ⏱ Atraso médio estimado: ${analysis.averageDelay} segundos <br><br>

        ⚠ <strong>Nível de risco: ${analysis.riskLevel}</strong>
      `;

    } catch (error) {
      console.error("Erro:", error);
      document.getElementById("resultado").innerHTML =
        "Erro ao processar dados.";
    }

  });


// ===== BOTÃO EXPORTAR =====
document.getElementById("btnExportar")
  .addEventListener("click", () => {
    exportToJSON();
  });