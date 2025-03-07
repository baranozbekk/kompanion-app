import { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Page1 from './components/pages/Page1.tsx';
import Page2 from './components/pages/Page2.tsx';
import Page3 from './components/pages/Page3.tsx';
import Page4 from './components/pages/Page4.tsx';
import LanguageSwitcher from './components/language-switcher/LanguageSwitcher.tsx';

import './App.css';

import { useTranslation } from 'react-i18next';

function App() {
  const {
    i18n: { language: currentLanguage },
  } = useTranslation();

  useLayoutEffect(() => {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
  }, [currentLanguage]);

  return (
    <Router>
      <div>
        <LanguageSwitcher />
        <Routes>
          <Route path="/*" element={<Navigate to="/signup/1" replace />} />
          <Route path="/signup/1" element={<Page1 />} />
          <Route path="/signup/2" element={<Page2 />} />
          <Route path="/signup/3" element={<Page3 />} />
          <Route path="/signup/4" element={<Page4 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
