// src/app/[category]/[conversion]/page.tsx
import type { Metadata } from 'next';
import { UNIT_DATA } from '@/lib/constants';
import ConverterClientPage from './ConverterClientPage';

type Props = {
  params: {
    category: string;
    conversion: string;
  };
};

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
  
  if (!categoryData.units[fromUnitKey] || !categoryData.units[toUnitKey]) {
    return {
      title: 'Invalid Conversion | United Converter',
      description: 'The requested conversion is not supported.',
    };
  }

  const fromUnitName = categoryData.units[fromUnitKey].name;
  const toUnitName = categoryData.units[toUnitKey].name;

  const title = `Convert ${fromUnitName} to ${toUnitName} – Fast & Accurate Online Converter`;
  const description = `Easily convert ${fromUnitName} to ${toUnitName} with our free online conversion tool. Get instant, accurate results with support for multiple measurement systems | United Converter`;

  // --- ↓↓↓ ДОБАВЛЯЕМ ЭТОТ БЛОК ↓↓↓ ---
  const baseUrl = 'https://united-converter.org';
  const canonicalUrl = `${baseUrl}/${category}/${conversion}`;
  // --- ↑↑↑ ДОБАВЛЯЕМ ЭТОТ БЛОК ↑↑↑ ---

  // Возвращаем объект метаданных
  return {
    title,
    description,
    // --- ↓↓↓ И ДОБАВЛЯЕМ СЮДА alternates ↓↓↓ ---
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// Это обычный, не-асинхронный компонент, как и должно быть в стабильной версии
export default function ConversionPage({ params }: Props) {
  const { category, conversion } = params;
  return <ConverterClientPage category={category} conversion={conversion} />;
}