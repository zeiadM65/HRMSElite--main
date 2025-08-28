import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = i18n.dir(newLang);
    document.documentElement.lang = newLang;
  };

  return (
    <button onClick={toggleLanguage}>
      {t('settings')}
    </button>
  );
};

export default LanguageSwitcher;
