// src/app/page.tsx
'use client'; // <-- Делаем HomePage клиентским компонентом, т.к. он будет хранить состояние

import { useState } from "react";
import AdBlock from "@/components/AdBlock";
import ConverterInterface from "@/components/ConverterInterface";
import PopularConversions from "@/components/PopularConversions";

export default function HomePage() {
  // --- Поднимаем состояние сюда ---
  // Теперь HomePage хранит информацию о выбранной категории и юнитах
  const [category, setCategory] = useState<string>('length');
  const [fromUnit, setFromUnit] = useState<string>('meter');
  const [toUnit, setToUnit] = useState<string>('kilometer');
  
  // Эта функция будет вызываться при клике на кнопку популярной конверсии
  const handlePopularConversionSelect = (cat: string, from: string, to: string) => {
    setCategory(cat);
    setFromUnit(from);
    setToUnit(to);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-4">
      {/* Left Sidebar Ad */}
      <aside className="hidden lg:block lg:w-1/6">
        <AdBlock size="300x250" className="h-80 sticky top-8" />
      </aside>

      {/* Main Content */}
      <div className="w-full lg:w-4/6">
        <ConverterInterface
          // Передаем состояние и функции для его изменения ВНИЗ в ConverterInterface
          category={category}
          setCategory={setCategory}
          fromUnit={fromUnit}
          setFromUnit={setFromUnit}
          toUnit={toUnit}
          setToUnit={setToUnit}
        />
        <PopularConversions
          // Передаем нашу функцию-обработчик ВНИЗ в PopularConversions
          onSelect={handlePopularConversionSelect}
        />
        {/* Bottom Ad */}
        <AdBlock size="728x90 (responsive)" className="h-28 md:h-32 w-full" />
      </div>

      {/* Right Sidebar Ad */}
      <aside className="hidden lg:block lg:w-1/6">
        <AdBlock size="300x250" className="h-80 sticky top-8" />
      </aside>
    </div>
  );
}