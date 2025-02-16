const sgMail = require('@sendgrid/mail');
const path = require('path');
const fs = require('fs');
const { generatePieChart, generateBarGraph, generateCSV } = require('./reportGenerator');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMonthlyReport(userEmail, expensesData, incomeData) {
  const pieChartPath = path.join(__dirname, 'pieChart.png');
  const barGraphPath = path.join(__dirname, 'barGraph.png');
  const expensesCSVPath = path.join(__dirname, 'expenses.csv');
  const incomeCSVPath = path.join(__dirname, 'income.csv');

  await generatePieChart(expensesData, pieChartPath);
  await generateBarGraph(incomeData, barGraphPath);
  await generateCSV(expensesData, expensesCSVPath);
  await generateCSV(incomeData, incomeCSVPath);

  const msg = {
    to: userEmail,
    from: 'your-email@example.com',
    subject: 'Monthly Financial Report',
    text: 'Please find attached your monthly financial report.',
    attachments: [
      {
        content: fs.readFileSync(pieChartPath).toString('base64'),
        filename: 'pieChart.png',
        type: 'image/png',
        disposition: 'attachment',
      },
      {
        content: fs.readFileSync(barGraphPath).toString('base64'),
        filename: 'barGraph.png',
        type: 'image/png',
        disposition: 'attachment',
      },
      {
        content: fs.readFileSync(expensesCSVPath).toString('base64'),
        filename: 'expenses.csv',
        type: 'text/csv',
        disposition: 'attachment',
      },
      {
        content: fs.readFileSync(incomeCSVPath).toString('base64'),
        filename: 'income.csv',
        type: 'text/csv',
        disposition: 'attachment',
      },
    ],
  };

  await sgMail.send(msg);
}

module.exports = sendMonthlyReport;