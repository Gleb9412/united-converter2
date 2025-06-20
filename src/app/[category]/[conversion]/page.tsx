// src/app/[category]/[conversion]/page.tsx
import type { Metadata } from 'next';
import { UNIT_DATA } from '@/lib/constants';
import ConverterClientPage from './ConverterClientPage';

// Тип для пропсов страницы
type Props = {
  params: {
    category: string;
    conversion: string;
  };
};

// Функция для генерации динамических мета-тегов
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, conversion } = params;

  // Безопасно парсим URL
  const conversionParts = conversion ? conversion.match(/(.+)-to-(.+)/) : null;
  const categoryData = UNIT_DATA[category];

  // Если URL некорректный, возвращаем метаданные по умолчанию
  if (!conversionParts || !categoryData) {
    return {
      title: 'Online Unit Converter',
      description: 'A fast and accurate online conversion tool.',
    };
  }

  const [, fromUnitKey, toUnitKey] = conversionParts;
  
  // Проверяем, существуют ли такие юниты
  if (!categoryData.units[fromUnitKey] || !categoryData.units[toUnitKey]) {
    return {
      title: 'Invalid Conversion | United Converter',
      description: 'The requested conversion is not supported.',
    };
  }

  // Получаем полные названия юнитов (например, "Meters", "Kilometers")
  const fromUnitName = categoryData.units[fromUnitKey].name;
  const toUnitName = categoryData.units[toUnitKey].name;

  // Создаем title и description по шаблонам
  const title = `Convert ${fromUnitName} to ${toUnitName} – Fast & Accurate Online Converter`;
  const description = `Easily convert ${fromUnitName} to ${toUnitName} with our free online conversion tool. Get instant, accurate results with support for multiple measurement systems | United Converter`;
  
  const baseUrl = 'https://united-converter.org';
  const canonicalUrl = `${baseUrl}/${category}/${conversion}`;

  // Возвращаем полный объект метаданных
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: title,
      description: description,
      url: canonicalUrl,
      siteName: 'United Converter',
      images: [
        {
          url: `${baseUrl}/og-image.png`, // Убедись, что файл og-image.png лежит в папке /public
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}

// Функция для генерации всех возможных страниц
export async function generateStaticParams() {
  const params = [];
  for (const categoryKey in UNIT_DATA) {
    const units = Object.keys(UNIT_DATA[categoryKey].units);
    for (const from of units) {
      for (const to of units) {
        if (from !== to) {
          params.push({
            category: categoryKey,
            conversion: `${from}-to-${to}`,
          });
        }
      }
    }
  }
  return params;
}

// Сам компонент страницы (серверный)
export default function ConversionPage({ params }: Props) {
  const { category, conversion } = params;
  
  // Рендерим клиентский компонент, передавая ему простые пропсы
  return <ConverterClientPage category={category} conversion={conversion} />;
}