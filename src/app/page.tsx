// src/app/page.tsx
'use client'; 

import { useState } from "react";
// Импорт AdBlock больше не нужен
import ConverterInterface from "@/components/ConverterInterface";
import PopularConversions from "@/components/PopularConversions";

export default function HomePage() {
  const [category, setCategory] = useState<string>('length');
  const [fromUnit, setFromUnit] = useState<string>('meter');
  const [toUnit, setToUnit] = useState<string>('kilometer');
  
  const handlePopularConversionSelect = (cat: string, from: string, to: string) => {
    setCategory(cat);
    setFromUnit(from);
    setToUnit(to);
  };

  return (
    // Упрощаем основной контейнер
    <div className="container mx-auto px-4 py-8">
      {/* Центрируем контент и задаем ему максимальную ширину, 
        чтобы он не растягивался слишком сильно на больших экранах.
      */}
      <div className="w-full max-w-2xl mx-auto">
        <ConverterInterface
          category={category}
          setCategory={setCategory}
          fromUnit={fromUnit}
          setFromUnit={setFromUnit}
          toUnit={toUnit}
          setToUnit={setToUnit}
        />
        <PopularConversions
          onSelect={handlePopularConversionSelect}
        />
        {/* Все компоненты <AdBlock> отсюда удалены */}
      </div>
    </div>
  );
}