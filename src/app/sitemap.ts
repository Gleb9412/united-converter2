// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { UNIT_DATA } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://united-converter.org';

  // Создаем URL для каждой категории из нашего файла с константами
  const categoryUrls = Object.keys(UNIT_DATA).map((category) => {
    return {
      url: `${siteUrl}/${category}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    } as const; // 'as const' нужно для TypeScript, чтобы он не ругался на тип
  });

  // Возвращаем массив, где первая ссылка - главная страница,
  // а остальные - страницы категорий.
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...categoryUrls,
  ];
}