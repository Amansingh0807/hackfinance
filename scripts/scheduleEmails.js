const cron = require('node-cron');
const sendMonthlyReport = require('../utils/sendEmail');
const { getUserData } = require('../utils/userData');

cron.schedule('0 0 1 * *', async () => {
  const users = await getUserData(); // Fetch user data from your database

  for (const user of users) {
    const { email, expensesSummary, incomeSummary } = user;
    await sendMonthlyReport(email, expensesSummary, incomeSummary);
  }
});