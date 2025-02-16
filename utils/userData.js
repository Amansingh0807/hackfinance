const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUserData() {
  const users = await prisma.user.findMany({
    include: {
      transactions: true,
    },
  });

  return users.map(user => {
    const expensesData = user.transactions.filter(t => t.type === 'EXPENSE');
    const incomeData = user.transactions.filter(t => t.type === 'INCOME');

    return {
      email: user.email,
      expensesData,
      incomeData,
    };
  });
}

module.exports = {
  getUserData,
};