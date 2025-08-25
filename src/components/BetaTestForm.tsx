"use client";

import { useState, useEffect } from "react";
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
import { CheckCircle, Loader2, Send } from "lucide-react";

export function BetaTestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<BetaTestFormData>({
    resolver: zodResolver(betaTestSchema),
    defaultValues: {
      role: "tourist",
    },
    mode: "onTouched", // Показываем ошибки при потере фокуса
  });

  // Регистрируем поле role для RHF
  useEffect(() => {
    register("role", { required: true });
  }, [register]);

  // Обработчик успешной валидации
  const onValid = async (data: BetaTestFormData) => {
    console.log("SEND:", data); // Диагностика
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
        setIsSubmitted(true);
        toast.success("Спасибо! Мы свяжемся с вами в ближайшее время.");
        
        // Автоматический редирект через 3 секунды
        setTimeout(() => {
          router.push("/success");
        }, 3000);
      } else {
        // 404/500 могут вернуть не JSON — подстрахуемся
        let message = "Произошла ошибка. Попробуйте ещё раз.";
        try {
          const err = await response.json();
          message = err?.message ?? message;
        } catch {}
        toast.error(message);
      }
    } catch {
      toast.error("Произошла ошибка сети. Попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Обработчик невалидной отправки
  const onInvalid = (errors: any) => {
    console.log("ERRORS:", errors); // Диагностика
    console.log("FORM VALUES:", watch()); // Показываем текущие значения формы
    setHasAttemptedSubmit(true);
    toast.error("Проверьте поля формы.");
  };

  const handleNewSubmission = () => {
    setIsSubmitted(false);
    setHasAttemptedSubmit(false);
    reset();
  };

  const role = watch("role");

  // Показываем ошибки только после попытки отправки
  const shouldShowError = (fieldName: keyof BetaTestFormData) => {
    return hasAttemptedSubmit && errors[fieldName];
  };

  // Если форма уже отправлена, показываем подтверждение
  if (isSubmitted) {
    return (
      <Card id="beta-form" className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-dark">
            Заявка отправлена!
          </CardTitle>
          <CardDescription className="text-lg text-slate-600">
            Спасибо за интерес к Nomadway
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-slate-600">
            Мы получили вашу заявку и свяжемся с вами в ближайшее время.
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={handleNewSubmission}
              variant="outline"
              className="w-full"
            >
              Отправить еще одну заявку
            </Button>
            
            <Button
              onClick={() => router.push("/success")}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Перейти на страницу успеха
            </Button>
          </div>
          
          <p className="text-xs text-slate-500">
            Автоматический переход через 3 секунды...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id="beta-form" className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-dark">Бета-тест</CardTitle>
        <CardDescription>
          Запишитесь на бета-тест и будьте первыми, кто попробует Nomadway
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name-field">Имя *</Label>
            <Input
              id="name-field"
              {...register("name")}
              placeholder="Ваше имя"
              className={shouldShowError("name") ? "border-destructive" : ""}
              disabled={isSubmitting}
            />
            {shouldShowError("name") && (
              <p className="text-sm text-destructive">{errors.name?.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-field">Контакт *</Label>
            <Input
              id="contact-field"
              {...register("contact")}
              placeholder="Email или WhatsApp"
              className={shouldShowError("contact") ? "border-destructive" : ""}
              disabled={isSubmitting}
            />
            {shouldShowError("contact") && (
              <p className="text-sm text-destructive">{errors.contact?.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Роль *</Label>
            <RadioGroup
              value={role}
              onValueChange={(value) => setValue("role", value as "tourist" | "company", { shouldValidate: true })}
              className="flex flex-col space-y-2"
              disabled={isSubmitting}
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
            {shouldShowError("role") && (
              <p className="text-sm text-destructive">{errors.role?.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Комментарий</Label>
            <Input
              id="comment"
              {...register("comment")}
              placeholder="Расскажите о ваших ожиданиях (необязательно)"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agreeToTerms"
              {...register("agreeToTerms")}
              className="w-4 h-4 text-primary bg-background border-gray-300 rounded focus:ring-primary focus:ring-2"
              disabled={isSubmitting}
            />
            <Label htmlFor="agreeToTerms" className="text-sm">
              Согласен с{" "}
              <a href="/privacy" className="text-primary hover:underline">
                обработкой персональных данных
              </a>
            </Label>
          </div>
          {shouldShowError("agreeToTerms") && (
            <p className="text-sm text-destructive">{errors.agreeToTerms?.message}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Отправляем...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Записаться на бета-тест
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 