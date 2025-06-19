// src/app/[category]/[conversion]/ConverterClientPage.tsx
'use client';

import { useRouter, notFound } from 'next/navigation';
// useEffect больше не нужен для этой логики
import { UNIT_DATA } from '@/lib/constants';
import ConverterInterface from '@/components/ConverterInterface';
import PopularConversions from '@/components/PopularConversions';

type ClientPageProps = {
  category: string;
  conversion: string;
};

export default function ConverterClientPage({ category: categoryKey, conversion }: ClientPageProps) {
  // --- ШАГ 1: ВЫЗОВ ВСЕХ ХУКОВ НА ВЕРХНЕМ УРОВНЕ ---
  const router = useRouter();

  // --- ШАГ 2: ПРОВЕРКА ДАННЫХ (ВАЛИДАЦИЯ) ---
  const conversionParts = conversion.match(/(.+)-to-(.+)/);
  const categoryData = UNIT_DATA[categoryKey];

  // Если URL невалидный (неправильная категория, юнит или формат),
  // то вызываем notFound() и останавливаем рендеринг.
  // Это правильный способ обработки неверных URL.
  if (!conversionParts || !categoryData) {
    return notFound();
  }

  const [, fromUnitKey, toUnitKey] = conversionParts;

  if (!categoryData.units[fromUnitKey] || !categoryData.units[toUnitKey]) {
    return notFound();
  }

  // --- ШАГ 3: ВСЯ ОСТАЛЬНАЯ ЛОГИКА (ОБРАБОТЧИКИ) ---
  // Если код дошел до сюда, значит все параметры URL корректны.

  const handleCategoryChange = (newCategory: string) => {
    const defaultUnits = Object.keys(UNIT_DATA[newCategory].units);
    const from = defaultUnits[0];
    const to = defaultUnits[1] || defaultUnits[0];
    router.push(`/${newCategory}/${from}-to-${to}`);
  };

  const handleFromUnitChange = (newFrom: string) => {
    if (newFrom === toUnitKey) return;
    router.push(`/${categoryKey}/${newFrom}-to-${toUnitKey}`);
  };

  const handleToUnitChange = (newTo: string) => {
    if (newTo === fromUnitKey) return;
    router.push(`/${categoryKey}/${fromUnitKey}-to-${newTo}`);
  };

  const handleSwapUnits = () => {
    router.push(`/${categoryKey}/${toUnitKey}-to-${fromUnitKey}`);
  };

  const handlePopularConversionSelect = (cat: string, from: string, to: string) => {
    router.push(`/${cat}/${from}-to-${to}`);
  };

  // --- ШАГ 4: РЕНДЕРИНГ КОМПОНЕНТА ---
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-2xl mx-auto">
        <ConverterInterface
          category={categoryKey}
          setCategory={handleCategoryChange}
          fromUnit={fromUnitKey}
          setFromUnit={handleFromUnitChange}
          toUnit={toUnitKey}
          setToUnit={handleToUnitChange}
          onSwap={handleSwapUnits}
        />
        <PopularConversions
          onSelect={handlePopularConversionSelect}
        />
      </div>
    </div>
  );
}