import { useId } from 'react';

import { useTranslation } from 'react-i18next';

import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();
  const selectId = useId();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(e.target.value);
  };

  return (
    <div className="select-container">
      <select value={language} onChange={handleChange} id={selectId}>
        <option value="en">English</option>
        <option value="ar">عربي</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
