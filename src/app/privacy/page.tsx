import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад на главную
            </Link>
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-dark mb-4">
              Политика конфиденциальности
            </h1>
            <p className="text-xl text-slate-600">
              Как мы защищаем и используем ваши персональные данные
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3 text-primary">
              <Shield className="w-6 h-6" />
              <h2 className="text-2xl font-bold text-dark">Общие положения</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Настоящая Политика конфиденциальности описывает, как Nomadway собирает, использует и защищает 
              персональную информацию пользователей. Мы стремимся обеспечить безопасность и конфиденциальность 
              ваших данных.
            </p>
          </section>

          {/* Data Collection */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3 text-primary">
              <Database className="w-6 h-6" />
              <h2 className="text-2xl font-bold text-dark">Какие данные мы собираем</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-semibold text-dark mb-2">Данные для бета-теста:</h3>
                <ul className="text-slate-600 space-y-1">
                  <li>• Имя и контактная информация</li>
                  <li>• Роль (турист или компания/гид)</li>
                  <li>• Добровольные комментарии</li>
                  <li>• Техническая информация (IP-адрес, User-Agent)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Usage */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3 text-primary">
              <Eye className="w-6 h-6" />
              <h2 className="text-2xl font-bold text-dark">Как мы используем данные</h2>
            </div>
            <div className="space-y-4">
              <p className="text-slate-600 leading-relaxed">
                Собранные данные используются исключительно для:
              </p>
              <ul className="text-slate-600 space-y-2 ml-6">
                <li>• Связи с участниками бета-теста</li>
                <li>• Улучшения функционала приложения</li>
                <li>• Анализа потребностей пользователей</li>
                <li>• Предоставления технической поддержки</li>
              </ul>
            </div>
          </section>

          {/* Data Protection */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3 text-primary">
              <Lock className="w-6 h-6" />
              <h2 className="text-2xl font-bold text-dark">Защита данных</h2>
            </div>
            <div className="space-y-4">
              <p className="text-slate-600 leading-relaxed">
                Мы применяем следующие меры для защиты ваших данных:
              </p>
              <ul className="text-slate-600 space-y-2 ml-6">
                <li>• Шифрование данных при передаче</li>
                <li>• Ограниченный доступ к персональным данным</li>
                <li>• Регулярные проверки безопасности</li>
                <li>• Соблюдение международных стандартов защиты данных</li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-dark">Передача данных третьим лицам</h2>
            <p className="text-slate-600 leading-relaxed">
              Мы не продаем, не обмениваем и не передаем ваши персональные данные третьим лицам, 
              за исключением случаев, когда это необходимо для:
            </p>
            <ul className="text-slate-600 space-y-2 ml-6">
              <li>• Выполнения обязательств перед вами</li>
              <li>• Соблюдения требований законодательства</li>
              <li>• Защиты наших прав и безопасности</li>
            </ul>
          </section>

          {/* User Rights */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-dark">Ваши права</h2>
            <p className="text-slate-600 leading-relaxed">
              Вы имеете право:
            </p>
            <ul className="text-slate-600 space-y-2 ml-6">
              <li>• Получить информацию о том, какие данные мы храним</li>
              <li>• Исправить неточные данные</li>
              <li>• Удалить свои данные</li>
              <li>• Отозвать согласие на обработку данных</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-dark">Свяжитесь с нами</h2>
            <p className="text-slate-600 leading-relaxed">
              Если у вас есть вопросы о нашей политике конфиденциальности или вы хотите 
              воспользоваться своими правами, свяжитесь с нами:
            </p>
            <div className="bg-primary/10 p-6 rounded-lg">
              <p className="text-dark font-medium">
                Email:{" "}
                <a
                  href="mailto:hello@nomadway.app"
                  className="text-primary hover:underline"
                >
                  hello@nomadway.app
                </a>
              </p>
            </div>
          </section>

          {/* Updates */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-dark">Обновления политики</h2>
            <p className="text-slate-600 leading-relaxed">
              Мы можем обновлять данную политику конфиденциальности. О любых изменениях 
              мы будем уведомлять вас через наше приложение или по email.
            </p>
            <p className="text-slate-500 text-sm">
              Последнее обновление: {new Date().toLocaleDateString("ru-RU")}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 