import { getHistory } from './storage.js';

export function exportToJSON() {

  const history = getHistory();

  const exportData = {
    exportDate: new Date().toISOString(),
    project: "Smart City Analytics",
    dataLake: history
  };

  const jsonString = JSON.stringify(exportData, null, 2);

  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "smart-city-data-export.json";
  a.click();

  URL.revokeObjectURL(url);
}