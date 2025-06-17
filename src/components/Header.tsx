// src/components/Header.tsx
'use client';
import { useTranslation } from '@/context/I18nProvider';

export default function Header() {
  const { t, setLocale, locale } = useTranslation();

  // Определяем языки и их названия
  const languages = {
    en: 'English',
    ru: 'Русский',
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <i className="fas fa-exchange-alt text-2xl mr-3"></i>
          <h1 className="text-2xl font-bold">{t('headerTitle')}</h1>
        </div>
        <div className="relative dropdown">
          <button className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md flex items-center">
            <i className="fas fa-globe mr-2"></i>
            <span>{languages[locale as keyof typeof languages]}</span>
            <i className="fas fa-chevron-down ml-2 text-sm"></i>
          </button>
          <div className="dropdown-content bg-white text-gray-800 rounded-md shadow-lg mt-1 right-0 w-40">
            <a href="#" onClick={() => setLocale('en')} className="block px-4 py-2 hover:bg-gray-100">English</a>
            <a href="#" onClick={() => setLocale('ru')} className="block px-4 py-2 hover:bg-gray-100">Русский</a>
          </div>
        </div>
      </div>
    </header>
  );
}