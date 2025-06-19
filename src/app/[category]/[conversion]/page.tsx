// src/app/[category]/[conversion]/page.tsx
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

// Это обычный, не-асинхронный компонент, как и должно быть в стабильной версии
export default function ConversionPage({ params }: Props) {
  const { category, conversion } = params;
  return <ConverterClientPage category={category} conversion={conversion} />;
}