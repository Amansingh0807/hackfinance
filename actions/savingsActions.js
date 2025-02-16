"use server";

import { createClient } from "@supabase/supabase-js";
import { savingsSchema } from "@/lib/savings";

// ✅ Use the correct environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// 🟢 Create a savings goal
export async function createSaving(goalAmount, description, motive) {
  const newSaving = {
    goalAmount: parseFloat(goalAmount),
    description,
    motive,
  };

  // Validate using Zod
  const validation = savingsSchema.safeParse(newSaving);
  if (!validation.success) {
    console.error("Validation errors:", validation.error.errors);
    throw new Error(validation.error.errors.map((e) => e.message).join(", "));
  }

  const { data, error } = await supabase
  .from("savings")
  .insert([{ 
    goal_amount: newSaving.goalAmount, 
    saved_amount: 0,  // 🛠️ Initialize saved amount
    description: newSaving.description, 
    motive: newSaving.motive 
  }])
  .select()
  .single();


  if (error) {
    throw new Error(`Error creating saving goal: ${error.message}`);
  }

  return data;
}

// 🟢 Fetch all savings
export async function getSavings() {
  const { data, error } = await supabase.from("savings").select("*");

  if (error) {
    throw new Error(`Error fetching savings: ${error.message}`);
  }

  return data || [];
}

// 🟢 Add saved money to a goal
export async function addSavedMoney(savingId, amount) {
  if (isNaN(amount) || amount <= 0) {
    throw new Error("Invalid amount entered");
  }

  const { data: saving, error: fetchError } = await supabase
    .from("savings")
    .select("saved_amount")
    .eq("id", savingId)
    .single();

  if (fetchError || !saving) {
    throw new Error("Saving goal not found");
  }

  const newSavedAmount = parseFloat(saving.saved_amount || 0) + parseFloat(amount);

  const { error: updateError } = await supabase
    .from("savings")
    .update({ saved_amount: newSavedAmount })
    .eq("id", savingId);

  if (updateError) {
    throw new Error(`Error updating savings: ${updateError.message}`);
  }

  return { id: savingId, saved_amount: newSavedAmount };
}


// 🟢 Increase goal amount
export async function increaseGoalAmount(savingId, newGoalAmount) {
  const { data: saving, error: fetchError } = await supabase
    .from("savings")
    .select("goal_amount")
    .eq("id", savingId)
    .single();

  if (fetchError || !saving) {
    throw new Error("Saving goal not found");
  }

  if (newGoalAmount <= saving.goal_amount) {
    throw new Error("New goal amount must be greater than the current goal amount");
  }

  const { error: updateError } = await supabase
    .from("savings")
    .update({ goal_amount: newGoalAmount })
    .eq("id", savingId);

  if (updateError) {
    throw new Error(`Error updating goal amount: ${updateError.message}`);
  }

  return { id: savingId, goal_amount: newGoalAmount };
}