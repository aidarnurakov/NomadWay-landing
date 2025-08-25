import { Mountain, Search, Smartphone, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Mountain,
    title: "Каталог лучших маршрутов и туров",
    description: "Тщательно отобранные маршруты от опытных гидов и туроператоров",
  },
  {
    icon: Search,
    title: "Фильтры по цене, сложности и регионам",
    description: "Быстро находите подходящий тур по вашим критериям",
  },
  {
    icon: Smartphone,
    title: "Заявка в 1 клик, без звонков",
    description: "Удобная подача заявки прямо из приложения",
  },
  {
    icon: Star,
    title: "Отзывы и рейтинги",
    description: "Скоро: честные отзывы от реальных путешественников",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Почему Nomadway?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Мы объединяем все лучшее для вашего путешествия по Кыргызстану
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-dark">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 