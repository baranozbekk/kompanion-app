import { useId } from 'react';

import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const selectId = useId();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(e.target.value);
  };

  return (
    <div style={{ position: 'absolute', top: 0, right: 0 }}>
      <label htmlFor={selectId}>{t('choose_language')}</label>
      <select value={language} onChange={handleChange} id={selectId}>
        <option value="en">English</option>
        <option value="ar">عربي</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
