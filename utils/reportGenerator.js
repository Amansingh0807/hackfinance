const { createCanvas } = require('canvas');
const { writeToPath } = require('csv-writer');
const fs = require('fs');
const path = require('path');
const Chart = require('chart.js');

async function generatePieChart(data, filePath) {
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      }],
    },
  });

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filePath, buffer);
}

async function generateBarGraph(data, filePath) {
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      }],
    },
  });

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filePath, buffer);
}

async function generateCSV(data, filePath) {
  const csvWriter = createCsvWriter({
    path: filePath,
    header: Object.keys(data[0]).map(key => ({ id: key, title: key })),
  });

  await csvWriter.writeRecords(data);
}

module.exports = {
  generatePieChart,
  generateBarGraph,
  generateCSV,
};