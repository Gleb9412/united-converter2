// src/app/[category]/[conversion]/page.tsx
import { UNIT_DATA } from '@/lib/constants';
import ConverterClientPage from './ConverterClientPage';

type PageProps = {
  params: {
    category: string;
    conversion: string;
  };
};

// Функция generateStaticParams остается без изменений
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

// Теперь это async функция
export default async function ConversionPage({ params }: PageProps) {
  // ИЗВЛЕКАЕМ ДАННЫЕ ЗДЕСЬ, НА СЕРВЕРЕ
  const { category, conversion } = params;

  // ПЕРЕДАЕМ ИХ КАК ОТДЕЛЬНЫЕ СВОЙСТВА (ПРОПСЫ)
  return <ConverterClientPage category={category} conversion={conversion} />;
}