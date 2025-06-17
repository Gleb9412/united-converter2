// src/context/I18nProvider.tsx
'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';

// Типизация для наших переводов
type Translations = typeof en;
type TranslationKey = keyof Translations;

// Создаем "контракт" (интерфейс) для нашего контекста.
interface II18nContext {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: TranslationKey) => string;
}

// Создаем контекст с использованием нашего контракта
const I18nContext = createContext<II18nContext>({
  locale: 'en',
  setLocale: () => {},
  t: () => '',
});

// Создаем "Провайдер"
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en');

  // Определяем объект с переводами прямо здесь, внутри компонента
  const translations = { en, ru };

  const t = (key: TranslationKey) => {
    // Проверяем, существует ли выбранный язык в наших переводах, иначе используем 'en'
    const currentLocale = locale as keyof typeof translations;
    const lang = translations[currentLocale] ? currentLocale : 'en';
    
    // Возвращаем перевод. Если ключ не найден, возвращаем сам ключ.
    return translations[lang][key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// Создаем кастомный хук для легкого доступа к функциям контекста
export const useTranslation = () => useContext(I18nContext);