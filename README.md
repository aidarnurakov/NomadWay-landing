# Nomadway Landing Page

Лендинг для бета-теста приложения Nomadway - агрегатора походов и туров в Кыргызстане.

## 🚀 Технологии

- **Next.js 14** с App Router
- **TypeScript** для типизации
- **TailwindCSS** для стилизации
- **shadcn/ui** для UI компонентов
- **react-hook-form** + **zod** для форм и валидации
- **Lucide React** для иконок

## 📋 Требования

- Node.js 18+ 
- npm или yarn

## 🛠️ Установка и запуск

### 1. Клонирование и установка зависимостей

```bash
git clone <repository-url>
cd landing
npm install
```

### 2. Настройка переменных окружения

Скопируйте файл с переменными окружения:

```bash
cp env.example .env.local
```

Отредактируйте `.env.local` и добавьте необходимые значения:

```env
# Database (опционально)
DATABASE_URL="postgresql://username:password@localhost:5432/nomadway"

# Telegram Bot (рекомендуется)
TELEGRAM_BOT_TOKEN="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
TELEGRAM_CHAT_ID="123456789"

# Email (fallback, если Telegram не настроен)
RESEND_API_KEY="re_xxxxxxxxxxxx"
RESEND_TO="hello@nomadway.app"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### 3. Настройка Telegram бота

#### Создание бота:
1. Напишите [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям и получите токен
4. Скопируйте токен в `TELEGRAM_BOT_TOKEN`

#### Получение Chat ID:
1. Добавьте бота в чат или начните с ним личную переписку
2. Отправьте боту любое сообщение
3. Откройте в браузере: `https://api.telegram.org/bot<TOKEN>/getUpdates`
4. Найдите `chat.id` в ответе и скопируйте в `TELEGRAM_CHAT_ID`

### 4. Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

## 🗄️ База данных (опционально)

Если указан `DATABASE_URL`, приложение будет сохранять заявки в PostgreSQL.

### Схема базы данных

```sql
CREATE TABLE leads (
  id VARCHAR(255) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  contact VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  comment TEXT,
  source VARCHAR(100),
  ip VARCHAR(45),
  user_agent TEXT
);
```

### Миграция с Prisma

1. Установите Prisma CLI:
```bash
npm install -g prisma
```

2. Инициализируйте Prisma:
```bash
npx prisma init
```

3. Создайте схему в `prisma/schema.prisma`:
```prisma
model Lead {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  name      String
  contact   String
  role      String
  comment   String?
  source    String?
  ip        String?
  userAgent String?
}
```

4. Примените миграцию:
```bash
npx prisma db push
```

## 📱 Telegram уведомления (рекомендуется)

### Преимущества:
- ✅ Мгновенные уведомления
- ✅ Не нужно настраивать email сервер
- ✅ Можно добавить в группу команды
- ✅ Легко настроить

### Настройка:
1. Создайте бота через @BotFather
2. Получите токен и chat_id
3. Добавьте в `.env.local`:
```env
TELEGRAM_BOT_TOKEN="ваш_токен"
TELEGRAM_CHAT_ID="ваш_chat_id"
```

## 📧 Email уведомления (fallback)

Если Telegram не настроен, заявки будут отправляться на email через Resend.

1. Зарегистрируйтесь на [resend.com](https://resend.com)
2. Получите API ключ
3. Добавьте в `.env.local`:
```env
RESEND_API_KEY="re_xxxxxxxxxxxx"
RESEND_TO="hello@nomadway.app"
```

## 🚀 Деплой на Vercel

### 1. Подготовка к деплою

```bash
npm run build
```

### 2. Деплой через Vercel CLI

```bash
npm install -g vercel
vercel
```

### 3. Деплой через GitHub

1. Запушьте код в GitHub
2. Подключите репозиторий к Vercel
3. Добавьте переменные окружения в настройках проекта

### 4. Переменные окружения в Vercel

Добавьте в настройках проекта:

```env
DATABASE_URL=postgresql://...
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
RESEND_API_KEY=re_...
RESEND_TO=hello@nomadway.app
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## 📱 Функциональность

### Главная страница
- Hero секция с призывом к действию
- Преимущества приложения
- Информация о проекте
- Форма бета-теста
- FAQ
- Контакты

### Форма бета-теста
- Валидация через Zod
- Rate limiting (5 запросов за 10 минут)
- Отправка в Telegram (приоритет)
- Сохранение в БД или отправка на email
- Редирект на страницу успеха

### Страницы
- `/` - главная страница
- `/privacy` - политика конфиденциальности
- `/success` - страница успешной отправки

## 🎨 Дизайн

### Цветовая схема
- **Primary**: #1FA49B (бирюзовый)
- **Accent**: #F5B301 (желтый)
- **Dark**: #0F2A2E (темно-синий)
- **Серые**: стандартные slate цвета

### Шрифты
- **Inter** - для основного текста
- **Poppins** - для заголовков

## 🔧 Доступные скрипты

```bash
npm run dev          # Запуск в режиме разработки
npm run build        # Сборка для продакшена
npm run start        # Запуск продакшен сборки
npm run lint         # Проверка кода
npm run format       # Форматирование кода
```

## 📁 Структура проекта

```
src/
├── app/                 # App Router страницы
│   ├── api/            # API endpoints
│   ├── globals.css     # Глобальные стили
│   ├── layout.tsx      # Корневой layout
│   ├── page.tsx        # Главная страница
│   ├── privacy/        # Страница политики
│   ├── success/        # Страница успеха
│   ├── sitemap.ts      # Sitemap
│   └── robots.ts       # Robots.txt
├── components/          # React компоненты
│   ├── ui/             # shadcn/ui компоненты
│   ├── Header.tsx      # Хедер
│   ├── Hero.tsx        # Hero секция
│   ├── Features.tsx    # Преимущества
│   ├── BetaTestForm.tsx # Форма бета-теста
│   ├── FAQ.tsx         # FAQ
│   └── Footer.tsx      # Футер
└── lib/                # Утилиты и схемы
    ├── schemas.ts      # Zod схемы
    └── utils.ts        # Общие утилиты
```

## 🚨 Безопасность

- Rate limiting для API
- Валидация всех входных данных
- Защита от CSRF атак
- Безопасное хранение данных

## 📊 Аналитика и мониторинг

- Логирование всех заявок
- Отслеживание IP адресов
- User-Agent информация
- Источник заявки
- Telegram уведомления в реальном времени

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License

## 📞 Поддержка

По всем вопросам обращайтесь на [hello@nomadway.app](mailto:hello@nomadway.app)
