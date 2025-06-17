// src/components/PopularConversions.tsx
'use client'; // Кнопки интерактивны, поэтому помечаем как клиентский компонент

type PopularConversionsProps = {
  // Определяем, что компонент ожидает получить функцию onSelect
  onSelect: (category: string, from: string, to: string) => void;
};

export default function PopularConversions({ onSelect }: PopularConversionsProps) {
  // Вспомогательная функция, чтобы не писать длинные атрибуты у кнопок
  const QuickButton = ({ cat, from, to, children }: { cat: string, from: string, to: string, children: React.ReactNode }) => (
    <button
      onClick={() => onSelect(cat, from, to)} // При клике вызываем функцию onSelect, переданную от родителя
      className="quick-convert bg-gray-100 hover:bg-gray-200 rounded-lg p-3 text-sm font-medium transition"
    >
      {children}
    </button>
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Popular Conversions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        <QuickButton cat="length" from="kilometer" to="mile">km → miles</QuickButton>
        <QuickButton cat="mass" from="kilogram" to="pound">kg → lbs</QuickButton>
        <QuickButton cat="temperature" from="celsius" to="fahrenheit">°C → °F</QuickButton>
        <QuickButton cat="digital" from="megabyte" to="gigabyte">MB → GB</QuickButton>
        <QuickButton cat="volume" from="liter" to="us_gallon">liters → gal</QuickButton>
        <QuickButton cat="speed" from="kilometer_per_hour" to="mile_per_hour">km/h → mph</QuickButton>
        <QuickButton cat="area" from="square_meter" to="square_foot">m² → ft²</QuickButton>
        <QuickButton cat="time" from="hour" to="minute">hours → min</QuickButton>
      </div>
    </div>
  );
}