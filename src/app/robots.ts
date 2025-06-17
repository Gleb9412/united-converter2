// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Эта директива относится ко всем поисковым роботам
      allow: '/',     // Мы разрешаем им сканировать все страницы сайта
      // disallow: '/private/', // Здесь можно было бы запретить какие-то разделы, но у нас их нет
    },
    // Указываем путь к нашей карте сайта. Используем "голый" домен, как и договаривались.
    sitemap: 'https://united-converter.org/sitemap.xml',
  };
}