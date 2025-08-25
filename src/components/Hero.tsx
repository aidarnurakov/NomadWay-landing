"use client";

import { ChevronDown } from "lucide-react";

export function Hero() {
  const scrollToForm = () => {
    console.log("🔍 Функция scrollToForm вызвана!");
    
    // Ищем форму бета-теста
    const betaForm = document.getElementById("beta-form");
    console.log("📋 Найденная форма:", betaForm);
    
    if (betaForm) {
      console.log("✅ Форма найдена, скроллим...");
      // Скроллим к форме с небольшим отступом сверху для хедера
      const headerHeight = 80; // Примерная высота хедера
      const elementPosition = betaForm.offsetTop - headerHeight;
      
      console.log("📍 Позиция для скролла:", elementPosition);
      
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    } else {
      console.log("❌ Форма бета-теста не найдена");
      // Fallback: попробуем найти по id секции
      const betaSection = document.getElementById("beta-test");
      if (betaSection) {
        console.log("🔄 Найдена секция, скроллим к ней");
        betaSection.scrollIntoView({ behavior: "smooth" });
      } else {
        console.log("💥 Ни форма, ни секция не найдены");
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
      {/* Background Pattern (за контентом) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-accent rounded-full"></div>
      </div>

      {/* Контент поверх */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-dark mb-6 leading-tight">
            Походы и туры по{" "}
            <span className="text-primary">Кыргызстану</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Скоро в одном приложении
          </p>
          
          {/* CTA Button - красивый дизайн */}
          <button
            onClick={scrollToForm}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            Записаться на бета-тест
          </button>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button
              onClick={scrollToForm}
              className="text-slate-400 hover:text-primary cursor-pointer p-2"
            >
              <ChevronDown className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 