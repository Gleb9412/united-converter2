// src/app/[category]/page.tsx
import { redirect } from 'next/navigation';
import { UNIT_DATA } from '@/lib/constants';
import { notFound } from 'next/navigation';

type PageProps = {
  params: {
    category: string;
  };
};

// Эта страница не будет ничего отображать, только перенаправлять
export default function CategoryPage({ params }: PageProps) {
  const categoryKey = params.category;
  const categoryData = UNIT_DATA[categoryKey];

  // Если такой категории нет в наших данных, показываем 404
  if (!categoryData) {
    notFound();
  }

  // Берем первые две единицы измерения из категории для URL по умолчанию
  const defaultUnits = Object.keys(categoryData.units);
  const fromUnit = defaultUnits[0];
  const toUnit = defaultUnits[1] || defaultUnits[0]; // Если всего одна единица, то to = from

  // Формируем URL и делаем редирект
  const destinationUrl = `/${categoryKey}/${fromUnit}-to-${toUnit}`;
  redirect(destinationUrl);

  // Возвращаем null, так как редирект произойдет на сервере
  return null;
}

// Эта функция нужна для Next.js, чтобы он заранее знал,
// какие страницы категорий существуют, и мог создать их статически.
export async function generateStaticParams() {
  return Object.keys(UNIT_DATA).map((category) => ({
    category: category,
  }));
}