// src/context/I18nProvider.tsx
'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';

// Типизация для наших переводов
type Translations = typeof en;

const translations: Record<string, Translations> = { en, ru };

// Создаем контекст
const I18nContext = createContext({
  locale: 'en',
  setLocale: (locale: string) => {},
  t: (key: keyof Translations) => '',
});

// Создаем "Провайдер" - компонент, который будет "оборачивать" наше приложение
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en');

  const t = (key: keyof Translations) => {
    return translations[locale]?.[key] || translations['en'][key];
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// Создаем кастомный хук для легкого доступа к функциям контекста
export const useTranslation = () => useContext(I18nContext);