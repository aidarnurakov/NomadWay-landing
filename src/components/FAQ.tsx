"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const faqs = [
  {
    question: "Когда запустится приложение?",
    answer: "Мы планируем запуск в начале 2025 года. Сейчас ведем активную разработку и тестирование.",
  },
  {
    question: "Будет ли приложение на кыргызском языке?",
    answer: "Да, приложение будет доступно на трех языках: русском, кыргызском и английском.",
  },
  {
    question: "Как я узнаю о запуске?",
    answer: "Все участники бета-теста получат уведомление о запуске приложения первыми.",
  },
  {
    question: "Будет ли приложение платным?",
    answer: "Базовый функционал будет бесплатным. Премиум-функции будут доступны по подписке.",
  },
  {
    question: "Какие регионы Кыргызстана будут покрыты?",
    answer: "Мы планируем охватить все регионы страны, начиная с популярных туристических направлений.",
  },
  {
    question: "Могу ли я стать партнером как туроператор?",
    answer: "Да, мы активно ищем партнеров среди туроператоров и гидов. Запишитесь на бета-тест и мы свяжемся с вами.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Ответы на самые популярные вопросы о Nomadway
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader
                className="cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-dark pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                </div>
              </CardHeader>
              {openIndex === index && (
                <CardContent className="pt-0 pb-6">
                  <p className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 