# 🚦 Smart City Analytics

Sistema web para monitoramento climático e estimativa de risco de congestionamento urbano, utilizando dados reais de clima e malha viária.

---

## 🎯 Objetivo

O Smart City Analytics tem como objetivo demonstrar como dados públicos podem ser combinados para gerar indicadores urbanos úteis, como previsão de impacto no tráfego com base em:

- 🌦 Condições climáticas
- 🛣 Velocidade média estimada da via
- 📊 Modelo matemático de saturação

O foco do projeto é oferecer uma visualização simples, clara e útil para o usuário final.

---

## 🧠 Como funciona

O sistema realiza os seguintes passos:

1. Obtém a localização do usuário via navegador.
2. Consulta dados climáticos em tempo real.
3. Consulta rota e tempo estimado de deslocamento.
4. Calcula a velocidade média da via.
5. Aplica um modelo matemático para estimar:
   - Índice de saturação
   - Atraso médio
   - Nível de risco

---

## 📊 Indicadores

### 🔹 Saturação

A saturação é um índice que representa o quanto a via está distante da condição ideal de tráfego.

- 0.00 → Fluxo livre
- 0.40 → Tráfego moderado
- 0.70+ → Congestionamento elevado
- 1.00 → Via próxima de parada total

O cálculo considera:
- Velocidade ideal urbana (60 km/h)
- Velocidade média atual
- Impacto de condições climáticas

---

### 🔹 Atraso Médio

Representa uma estimativa do tempo adicional (em segundos) que um veículo pode estar perdendo no trecho analisado, em comparação com a condição ideal.

Exemplo:

Se a via deveria estar a 60 km/h, mas está a 37 km/h, o sistema estima o atraso proporcional ao trecho analisado.

---

### 🔹 Nível de Risco

Classificação baseada na saturação:

- 🟢 BAIXO
- 🟡 MÉDIO
- 🔴 ALTO

---

## 🌐 APIs Utilizadas

### 🌦 Clima
- Open-Meteo API (dados meteorológicos em tempo real)

### 🛣 Roteamento
- OSRM (OpenStreetMap Routing Machine)
- Baseado em dados do OpenStreetMap

---

## ⚠️ Observações Importantes

- O sistema NÃO utiliza contagem real de veículos.
- Não há dados pagos ou privados.
- Todas as informações são públicas e gratuitas.
- O índice de saturação é um modelo matemático simplificado para fins demonstrativos.

---

## 🚀 Como executar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/yuridferreira/smartcity.git