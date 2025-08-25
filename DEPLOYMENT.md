# 🚀 Инструкция по деплою Nomadway Landing

## Подготовка к деплою

### 1. Проверка сборки

Убедитесь, что проект собирается без ошибок:

```bash
npm run build
```

### 2. Настройка переменных окружения

Создайте файл `.env.local` на основе `env.example`:

```bash
cp env.example .env.local
```

Заполните необходимые переменные:

```env
# Database (опционально)
DATABASE_URL="postgresql://username:password@localhost:5432/nomadway"

# Email (опционально)
RESEND_API_KEY="re_xxxxxxxxxxxx"
RESEND_TO="hello@nomadway.app"

# App Configuration
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
NODE_ENV="production"
```

## Деплой на Vercel

### Способ 1: Через Vercel CLI

1. Установите Vercel CLI:
```bash
npm install -g vercel
```

2. Войдите в аккаунт:
```bash
vercel login
```

3. Деплой:
```bash
vercel
```

4. Следуйте инструкциям в терминале

### Способ 2: Через GitHub + Vercel Dashboard

1. Запушьте код в GitHub репозиторий

2. Перейдите на [vercel.com](https://vercel.com)

3. Нажмите "New Project"

4. Импортируйте ваш GitHub репозиторий

5. Настройте проект:
   - Framework Preset: Next.js
   - Root Directory: `./` (или оставьте пустым)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

6. Добавьте переменные окружения в настройках проекта

### Способ 3: Через Vercel Dashboard (без GitHub)

1. Перейдите на [vercel.com](https://vercel.com)

2. Нажмите "New Project"

3. Выберите "Upload" и загрузите ZIP архив с проектом

4. Настройте проект как в способе 2

## Настройка переменных окружения в Vercel

В настройках проекта перейдите в раздел "Environment Variables" и добавьте:

```env
DATABASE_URL=postgresql://username:password@host:port/database
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_TO=hello@nomadway.app
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NODE_ENV=production
```

## Настройка домена

1. В настройках проекта перейдите в "Domains"

2. Добавьте ваш домен (например, `nomadway.app`)

3. Настройте DNS записи согласно инструкциям Vercel

4. Дождитесь обновления DNS (может занять до 24 часов)

## Проверка деплоя

После успешного деплоя проверьте:

1. Главная страница загружается
2. Форма бета-теста работает
3. API endpoint `/api/beta` отвечает
4. Страницы `/privacy` и `/success` доступны
5. Sitemap и robots.txt работают

## Мониторинг и аналитика

### Vercel Analytics

Включите Vercel Analytics в настройках проекта для отслеживания:
- Посещений
- Производительности
- Ошибок

### Логи

Просматривайте логи в разделе "Functions" для мониторинга API:
- Успешные запросы
- Ошибки
- Время выполнения

## Обновление деплоя

### Автоматическое обновление

При подключении к GitHub деплой будет происходить автоматически при каждом пуше в main ветку.

### Ручное обновление

```bash
vercel --prod
```

## Troubleshooting

### Ошибка сборки

1. Проверьте логи сборки в Vercel
2. Убедитесь, что проект собирается локально
3. Проверьте версии зависимостей

### Ошибки API

1. Проверьте переменные окружения
2. Убедитесь, что база данных доступна
3. Проверьте логи функций в Vercel

### Проблемы с доменом

1. Проверьте DNS настройки
2. Убедитесь, что домен правильно добавлен в Vercel
3. Дождитесь обновления DNS

## Безопасность

### HTTPS

Vercel автоматически предоставляет SSL сертификаты для всех доменов.

### Заголовки безопасности

В `vercel.json` настроены заголовки безопасности:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy

### Rate Limiting

API endpoint `/api/beta` имеет встроенное ограничение:
- Максимум 5 запросов за 10 минут с одного IP

## Масштабирование

### Автоматическое масштабирование

Vercel автоматически масштабирует ваше приложение в зависимости от нагрузки.

### Edge Functions

Для лучшей производительности API endpoint работает как Edge Function.

### CDN

Статические файлы автоматически раздаются через глобальную CDN сеть Vercel.

## Поддержка

При возникновении проблем:

1. Проверьте [документацию Vercel](https://vercel.com/docs)
2. Обратитесь в [поддержку Vercel](https://vercel.com/support)
3. Свяжитесь с командой Nomadway: hello@nomadway.app 