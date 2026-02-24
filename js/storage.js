export function saveRawData(data) {

  const rawEntry = {
    timestamp: new Date().toISOString(),
    ...data
  };

  const existing = JSON.parse(localStorage.getItem("rawData")) || [];
  existing.push(rawEntry);

  localStorage.setItem("rawData", JSON.stringify(existing));
}

export function saveAnalyticsData(data) {

  const analyticsEntry = {
    timestamp: new Date().toISOString(),
    ...data
  };

  const existing = JSON.parse(localStorage.getItem("analyticsData")) || [];
  existing.push(analyticsEntry);

  localStorage.setItem("analyticsData", JSON.stringify(existing));
}

export function getHistory() {
  return {
    raw: JSON.parse(localStorage.getItem("rawData")) || [],
    analytics: JSON.parse(localStorage.getItem("analyticsData")) || []
  };
}