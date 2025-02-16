import { z } from "zod";


export const savingsSchema = z.object({
  goalAmount: z.number().min(1, "Goal amount is required and must be a positive number"),
  description: z.string().min(1, "Description is required"),
  motive: z.string().min(1, "Motive is required"),
});