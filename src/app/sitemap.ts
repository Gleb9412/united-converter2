// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { UNIT_DATA } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://united-converter.org';

  // 1. URL для главной страницы
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ];

  // 2. URL для всех страниц категорий
  Object.keys(UNIT_DATA).forEach((category) => {
    routes.push({
      url: `${siteUrl}/${category}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  });

  // 3. URL для каждой возможной конвертации
  for (const categoryKey in UNIT_DATA) {
    const units = Object.keys(UNIT_DATA[categoryKey].units);
    for (const from of units) {
      for (const to of units) {
        // Создаем URL только если единицы не совпадают
        if (from !== to) {
          routes.push({
            url: `${siteUrl}/${categoryKey}/${from}-to-${to}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
          });
        }
      }
    }
  }

  return routes;
}