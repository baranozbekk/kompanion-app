import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useSessionStorage } from '../../utils/hooks/useSessionStorage';

import Error from '../error/Error';

function Page4() {
  const {
    t,
    i18n: { language: currentLanguage },
  } = useTranslation();
  const [get, set] = useSessionStorage();
  const [registrationData, setRegistrationData] = useState(get);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const {
    height = null,
    weight = null,
    selectedDays = null,
    goal = null,
    formData: {
      name: cachedName = null,
      surname: cachedSurname = null,
      email: cachedEmail = null,
      password: cachedPassword = null,
    },
  } = registrationData;

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!height || !weight) {
      navigate('/signup/1');
      return;
    }
    if (!selectedDays || !selectedDays.length) {
      navigate('/signup/2');
      return;
    }
    if (!goal) {
      navigate('/signup/3');
      return;
    }
    // if (cachedName && cachedSurname && cachedEmail && cachedPassword) {
    //   setFormData({
    //     name: cachedName || '',
    //     surname: cachedSurname || '',
    //     email: cachedEmail || '',
    //     password: cachedPassword || '',
    //   });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    if (currentLanguage === 'ar') {
      containerRef.current?.classList.add('page-exit-forward');
    } else {
      containerRef.current?.classList.add('page-exit-back');
    }

    setTimeout(() => {
      navigate('/signup/3');
    }, 500);
  };

  const handleSave = () => {
    // const container = document.querySelector('.container');
    // container?.classList.add('page-exit-forward');

    if (headingRef.current) {
      headingRef.current.textContent = 'Saving...';
      setTimeout(() => {
        if (headingRef.current) {
          headingRef.current.textContent = 'Saved. Check console.';
        }
      }, 1000);
    }

    // setTimeout(() => {
    //   const finalData = {
    //     ...JSON.parse(sessionStorage.getItem('registrationData') || '{}'),
    //     formData,
    //   };
    //   sessionStorage.setItem('registrationData', JSON.stringify(finalData));
    //   console.log('Final Registration Data:', finalData);
    // }, 300);

    set({ ...registrationData, formData })
      .then(() => {
        console.log('saved...');
      })
      .catch(() =>
        setTimeout(() => {
          setError(true);
        }, 500)
      );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {error && <Error />}
      <div ref={containerRef} className="container">
        <h1 ref={headingRef}>{t('page4_title')}</h1>
        <div className="form-group">
          <label>
            {t('name')}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('name_placeholder')}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            {t('surname')}
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              placeholder={t('surname_placeholder')}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            {t('email')}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('email_placeholder')}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            {t('password')}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('password_placeholder')}
            />
          </label>
        </div>
        <div className="button-group">
          <button onClick={handleBack}>{t('back')}</button>
          <button
            onClick={handleSave}
            disabled={!formData.name || !formData.surname || !formData.email || !formData.password}
          >
            {t('save')}
          </button>
        </div>
      </div>
    </>
  );
}

export default Page4;
