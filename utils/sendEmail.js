const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMonthlyReport(userEmail, expensesSummary, incomeSummary) {
  const msg = {
    to: userEmail,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: 'Monthly Financial Report',
    text: `Here is your monthly financial report:\n\nExpenses: ${expensesSummary}\nIncome: ${incomeSummary}`,
  };

  await sgMail.send(msg);
}

module.exports = sendMonthlyReport;