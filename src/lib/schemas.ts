import { z } from "zod";

export const betaTestSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  contact: z.string().min(1, "Укажите контакт"),
  role: z.enum(["tourist", "company"]),
  comment: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "Необходимо согласие с обработкой персональных данных",
  }),
});

export type BetaTestFormData = z.infer<typeof betaTestSchema>;

export const roleLabels = {
  tourist: "Турист",
  company: "Компания/Гид",
} as const; 