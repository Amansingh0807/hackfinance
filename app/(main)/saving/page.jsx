import { BudgetProgress } from "./_components/budget-progress";
import SavingsForm from "./_components/SavingsForm";
import SavingsList from "./_components/SavingsList";

export default function SavingsPage() {
  return (
    <div className="p-6 mt-16">
      <h1 className="text-2xl font-bold mt-16 mb-4">Savings Goals</h1>
      <BudgetProgress/>
      <SavingsForm />
      <SavingsList />
    </div>
  );
}
