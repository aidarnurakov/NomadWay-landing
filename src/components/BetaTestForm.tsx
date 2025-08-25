"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { betaTestSchema, type BetaTestFormData, roleLabels } from "@/lib/schemas";

export function BetaTestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BetaTestFormData>({
    resolver: zodResolver(betaTestSchema),
    defaultValues: {
      role: "tourist",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: BetaTestFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/beta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Спасибо! Мы свяжемся с вами в ближайшее время.");
        router.push("/success");
      } else {
        const error = await response.json();
        toast.error(error.message || "Произошла ошибка. Попробуйте еще раз.");
      }
    } catch (error) {
      toast.error("Произошла ошибка. Попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const role = watch("role");

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-dark">Бета-тест</CardTitle>
        <CardDescription>
          Запишитесь на бета-тест и будьте первыми, кто попробует Nomadway
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Имя *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Ваше имя"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Контакт *</Label>
            <Input
              id="contact"
              {...register("contact")}
              placeholder="Email или WhatsApp"
              className={errors.contact ? "border-destructive" : ""}
            />
            {errors.contact && (
              <p className="text-sm text-destructive">{errors.contact.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Роль *</Label>
            <RadioGroup
              value={role}
              onValueChange={(value) => setValue("role", value as "tourist" | "company")}
              className="flex flex-col space-y-2"
            >
              {Object.entries(roleLabels).map(([value, label]) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={value} />
                  <Label htmlFor={value} className="text-sm font-normal">
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Комментарий</Label>
            <Input
              id="comment"
              {...register("comment")}
              placeholder="Расскажите о ваших ожиданиях (необязательно)"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agreeToTerms"
              {...register("agreeToTerms")}
              className="w-4 h-4 text-primary bg-background border-gray-300 rounded focus:ring-primary focus:ring-2"
            />
            <Label htmlFor="agreeToTerms" className="text-sm">
              Согласен с{" "}
              <a href="/privacy" className="text-primary hover:underline">
                обработкой персональных данных
              </a>
            </Label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-destructive">{errors.agreeToTerms.message}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? "Отправляем..." : "Записаться на бета-тест"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 