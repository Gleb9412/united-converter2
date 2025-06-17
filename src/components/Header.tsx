// src/components/Header.tsx
'use client';

import { useTranslation } from '@/context/I18nProvider';

export default function Header() {
  // Мы по-прежнему используем `t` для перевода заголовка,
  // но убираем всю логику, связанную с переключением языка.
  const { t } = useTranslation();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <i className="fas fa-exchange-alt text-2xl mr-3"></i>
          <h1 className="text-2xl font-bold">{t('headerTitle')}</h1>
        </div>
        
        {/* Блок с переключателем языка полностью удален */}
        
      </div>
    </header>
  );
}