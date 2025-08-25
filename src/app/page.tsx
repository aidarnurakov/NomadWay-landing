"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { BetaTestForm } from "@/components/BetaTestForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function Home() {
  const [participantCount, setParticipantCount] = useState(57);

  // Имитация увеличения количества участников
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipantCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000); // Каждые 30 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      
      <Hero />

      {/* Participant Count Banner - теперь в потоке страницы */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm shadow-lg border-primary/20">
            <CardContent className="px-6 py-4 flex items-center justify-center space-x-3">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-base font-medium text-dark">
                Уже <span className="text-primary font-bold text-lg">{participantCount}</span> человек записались
              </span>
            </CardContent>
          </Card>
        </div>
      </div>

      <Features />

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-8">
              О проекте
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Nomadway — это первое приложение, которое объединяет все туристические возможности Кыргызстана в одном месте.
                </p>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Мы работаем с проверенными туроператорами и гидами, чтобы предложить вам только качественные маршруты и туры.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Наша миссия — сделать путешествия по Кыргызстану доступными, безопасными и незабываемыми.
                </p>
              </div>
              <div className="relative">
                {/* Placeholder для изображения */}
                <div className="w-full h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <div className="text-6xl mb-4">🏔️</div>
                    <p className="text-lg font-medium">Красота Кыргызстана</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Test Section */}
      <section id="beta-test" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
              Присоединяйтесь к бета-тесту
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Будьте первыми, кто попробует Nomadway и получит эксклюзивный доступ к приложению
            </p>
          </div>
          
          <BetaTestForm />
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
              Как это будет выглядеть
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Предварительный обзор интерфейса приложения
            </p>
          </div>
          
          <div className="flex justify-center">
            {/* Placeholder для скриншота в телефоне */}
            <div className="relative">
              <div className="w-64 h-96 bg-slate-800 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <div className="text-4xl mb-4">📱</div>
                    <p className="text-sm font-medium">Скриншот приложения</p>
                    <p className="text-xs text-slate-400 mt-2">Скоро</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
              Свяжитесь с нами
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Есть вопросы или предложения? Мы всегда рады общению!
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto text-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-dark mb-2">Email</h3>
                <a
                  href="mailto:hello@nomadway.app"
                  className="text-primary hover:underline text-lg"
                >
                  hello@nomadway.app
                </a>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-dark mb-2">Социальные сети</h3>
                <p className="text-slate-600">
                  Скоро мы появимся в Instagram, Facebook и Twitter
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
