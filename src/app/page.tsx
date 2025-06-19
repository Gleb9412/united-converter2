// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Просто перенаправляем на страницу конвертации по умолчанию.
  // Это хорошая практика, чтобы главная страница сразу вела на полезный контент.
  redirect('/length/meter-to-kilometer');

  // Ничего не возвращаем, так как происходит редирект
  return null;
}