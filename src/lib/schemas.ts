import { z } from "zod";

export const betaTestSchema = z.object({
  name: z.string({ required_error: "Имя обязательно" }).min(2, "Минимум 2 символа"),
  contact: z
    .string({ required_error: "Контакт обязателен" })
    .min(1, "Укажите email или WhatsApp")
    .refine(v => /\S+@\S+\.\S+/.test(v) || /^\+?\d{8,15}$/.test(v), "Email или телефон"),
  role: z.enum(["tourist", "company"], { required_error: "Выберите роль" }),
  comment: z.string().optional(),
  agreeToTerms: z.literal(true, { errorMap: () => ({ message: "Нужно согласие" }) }),
});

export type BetaTestFormData = z.infer<typeof betaTestSchema>;

export const roleLabels = {
  tourist: "Турист",
  company: "Компания/Гид",
} as const; 