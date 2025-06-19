// src/components/ConverterInterface.tsx
'use client';

import { useState, useEffect } from 'react';
import { UNIT_DATA } from '@/lib/constants';
import { useTranslation } from '@/context/I18nProvider'; // <-- Импортируем наш хук

// Определяем, какие пропсы (props) компонент будет получать от родителя
type ConverterInterfaceProps = {
  category: string;
  setCategory: (value: string) => void;
  fromUnit: string;
  setFromUnit: (value: string) => void;
  toUnit: string;
  setToUnit: (value: string) => void;
  onSwap?: () => void;
};

export default function ConverterInterface({
  category,
  setCategory,
  fromUnit,
  setFromUnit,
  toUnit,
  setToUnit,
  onSwap,
}: ConverterInterfaceProps) {
  // Получаем функцию `t` из нашего контекста
  const { t } = useTranslation();

  // Состояние для ввода и результата остается ВНУТРИ этого компонента
  const [inputValue, setInputValue] = useState<string>('1');
  const [result, setResult] = useState<string>('');

  const currentUnits = UNIT_DATA[category]?.units;

  // Логика конвертации
  useEffect(() => {
    if (!currentUnits || inputValue === '' || isNaN(parseFloat(inputValue))) {
      setResult('');
      return;
    }
    const value = parseFloat(inputValue);
    const from = currentUnits[fromUnit];
    const to = currentUnits[toUnit];
    if (!from || !to) return;

    let conversionResult;
    if (category === 'temperature') {
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') conversionResult = (value * 9/5) + 32;
      else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') conversionResult = (value - 32) * 5/9;
      else if (fromUnit === 'celsius' && toUnit === 'kelvin') conversionResult = value + 273.15;
      else if (fromUnit === 'kelvin' && toUnit === 'celsius') conversionResult = value - 273.15;
      else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') conversionResult = (value - 32) * 5/9 + 273.15;
      else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') conversionResult = (value - 273.15) * 9/5 + 32;
      else conversionResult = value;
    } else {
      const valueInBaseUnit = value * from.factor;
      conversionResult = valueInBaseUnit / to.factor;
    }
    const formattedResult = Number(conversionResult.toFixed(4)).toString();
    setResult(formattedResult);
  }, [inputValue, fromUnit, toUnit, category, currentUnits]);
  
  // Обработчик смены юнитов местами
  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">{t('convertTitle')}</h2>
      <div className="space-y-6">
        {/* === ВЫБОР КАТЕГОРИИ === */}
        <div>
          <label htmlFor="unitCategory" className="block text-sm font-medium text-gray-700 mb-1">{t('categoryLabel')}</label>
          <div className="relative">
            <select
              id="unitCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              {Object.entries(UNIT_DATA).map(([key, value]) => (
                <option key={key} value={key}>{value.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <i className="fas fa-chevron-down text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* === ВЫБОР ЕДИНИЦ И КНОПКА SWAP МЕЖДУ НИМИ === */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-2 items-end">
          {/* From Unit */}
          <div>
            <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-700 mb-1">{t('fromLabel')}</label>
            <div className="relative">
              <select
                id="fromUnit"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                {currentUnits && Object.entries(currentUnits).map(([key, value]) => (
                  <option key={key} value={key}>{value.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <i className="fas fa-chevron-down text-gray-400"></i>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center pb-1">
            <button
              onClick={onSwap || handleSwapUnits}
              title="Swap units"
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
            >
              <i className="fas fa-exchange-alt"></i>
            </button>
          </div>

          {/* To Unit */}
          <div>
            <label htmlFor="toUnit" className="block text-sm font-medium text-gray-700 mb-1">{t('toLabel')}</label>
            <div className="relative">
              <select
                id="toUnit"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                {currentUnits && Object.entries(currentUnits).map(([key, value]) => (
                  <option key={key} value={key}>{value.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <i className="fas fa-chevron-down text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>

        {/* === ПОЛЕ ВВОДА === */}
        <div>
          <label htmlFor="inputValue" className="block text-sm font-medium text-gray-700 mb-1">{t('valueLabel')}</label>
          <div className="relative">
            <input
              type="number"
              id="inputValue"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* === ОТОБРАЖЕНИЕ РЕЗУЛЬТАТА === */}
        {result && (
          <div className="fade-in bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-gray-600">
              {inputValue} {currentUnits?.[fromUnit]?.name} =
            </p>
            <p className="text-3xl font-bold text-blue-800">
              {result} {currentUnits?.[toUnit]?.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}