import { NextRequest, NextResponse } from "next/server";
import { betaTestSchema } from "@/lib/schemas";

// In-memory storage for rate limiting (в продакшене лучше использовать Redis)
const ipRequests = new Map<string, { count: number; resetTime: number }>();

// Rate limiting: максимум 5 запросов за 10 минут
const RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 10 * 60 * 1000, // 10 минут
};

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requestData = ipRequests.get(ip);

  if (!requestData) {
    ipRequests.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return false;
  }

  if (now > requestData.resetTime) {
    ipRequests.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return false;
  }

  if (requestData.count >= RATE_LIMIT.maxRequests) {
    return true;
  }

  requestData.count++;
  return false;
}

// Функция отправки в Telegram
async function sendToTelegram(data: any) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  if (!botToken || !chatId) {
    console.log("Telegram не настроен: отсутствует токен или chat_id");
    return false;
  }

  try {
    const message = `
🚀 *Новая заявка на бета-тест Nomadway*

👤 *Имя:* ${data.name}
📱 *Контакт:* ${data.contact}
🎯 *Роль:* ${data.role === "tourist" ? "Турист" : "Компания/Гид"}
💬 *Комментарий:* ${data.comment || "Не указан"}
🌐 *Источник:* ${data.source}
📍 *IP:* ${data.ip}
⏰ *Время:* ${data.createdAt.toLocaleString("ru-RU")}
    `.trim();

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (response.ok) {
      console.log("✅ Заявка отправлена в Telegram");
      return true;
    } else {
      console.error("❌ Ошибка отправки в Telegram:", await response.text());
      return false;
    }
  } catch (error) {
    console.error("❌ Ошибка Telegram API:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: "Слишком много запросов. Попробуйте позже." },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Валидация данных
    const validatedData = betaTestSchema.parse(body);
    
    // Получаем дополнительные данные
    const userAgent = request.headers.get("user-agent") || "";
    const source = "landing-beta-test";
    
    const leadData = {
      ...validatedData,
      source,
      ip,
      userAgent,
      createdAt: new Date(),
    };

    // Логируем данные
    console.log("📝 New beta test lead:", leadData);

    // 1. Отправляем в Telegram (приоритет)
    const telegramSent = await sendToTelegram(leadData);

    // 2. Пытаемся сохранить в базу данных
    if (process.env.DATABASE_URL) {
      try {
        // Здесь будет логика с базой данных
        // Пока просто логируем
        console.log("💾 Would save to database:", leadData);
      } catch (dbError) {
        console.error("❌ Database error:", dbError);
      }
    }

    // 3. Пытаемся отправить email (fallback)
    if (!telegramSent && process.env.RESEND_API_KEY && process.env.RESEND_TO) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "noreply@nomadway.app",
            to: process.env.RESEND_TO,
            subject: "Новая заявка на бета-тест Nomadway",
            html: `
              <h2>Новая заявка на бета-тест</h2>
              <p><strong>Имя:</strong> ${leadData.name}</p>
              <p><strong>Контакт:</strong> ${leadData.contact}</p>
              <p><strong>Роль:</strong> ${leadData.role === "tourist" ? "Турист" : "Компания/Гид"}</p>
              <p><strong>Комментарий:</strong> ${leadData.comment || "Не указан"}</p>
              <p><strong>IP:</strong> ${leadData.ip}</p>
              <p><strong>Время:</strong> ${leadData.createdAt.toLocaleString("ru-RU")}</p>
            `,
          }),
        });

        if (emailResponse.ok) {
          console.log("📧 Email sent successfully");
        } else {
          console.error("❌ Email sending failed:", await emailResponse.text());
        }
      } catch (emailError) {
        console.error("❌ Email error:", emailError);
      }
    }

    return NextResponse.json(
      { message: "Заявка успешно отправлена!" },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ API error:", error);
    
    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json(
        { message: "Неверные данные формы" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
} 