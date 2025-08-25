import Link from "next/link";
import { CheckCircle, ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-xl border-0">
        <CardHeader className="pb-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-dark">
            Спасибо за заявку!
          </CardTitle>
          <CardDescription className="text-lg text-slate-600">
            Мы получили вашу заявку на бета-тест Nomadway
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-3">
            <p className="text-slate-600">
              В ближайшее время мы свяжемся с вами для уточнения деталей и приглашения на бета-тест.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">Спасибо за интерес к нашему проекту!</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Вернуться на главную
              </Link>
            </Button>
            
            <p className="text-xs text-slate-500">
              Если у вас есть вопросы, напишите нам на{" "}
              <a
                href="mailto:hello@nomadway.app"
                className="text-primary hover:underline"
              >
                hello@nomadway.app
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 