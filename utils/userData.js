const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUserData() {
  const users = await prisma.user.findMany({
    include: {
      transactions: true,
    },
  });

  return users.map(user => {
    const expenses = user.transactions.filter(t => t.type === 'EXPENSE');
    const income = user.transactions.filter(t => t.type === 'INCOME');

    const expensesSummary = expenses.reduce((sum, t) => sum + parseFloat(t.amount), 0).toFixed(2);
    const incomeSummary = income.reduce((sum, t) => sum + parseFloat(t.amount), 0).toFixed(2);

    return {
      email: user.email,
      expensesSummary,
      incomeSummary,
    };
  });
}

module.exports = {
  getUserData,
};