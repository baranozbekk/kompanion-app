import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useSessionStorage } from '../../../utils/hooks/useSessionStorage';

import Error from '../../error/Error';

import './Page2.css';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function Page2() {
  const {
    t,
    i18n: { language: currentLanguage },
  } = useTranslation();
  const [get, set] = useSessionStorage();
  const [registrationData] = useState(get);
  const [error, setError] = useState(false);
  const {
    height = null,
    weight = null,
    selectedDays: cachedSelectedDays = null,
  } = registrationData;
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [disabledDays, setDisabledDays] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!height || !weight) {
      navigate('/signup/1');
      return;
    }
    if (Number(weight) / Number(height) > 0.5) {
      setDisabledDays(['tuesday', 'thursday', 'friday']);
    }
    if (cachedSelectedDays) {
      setSelectedDays(cachedSelectedDays);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDay = (day: string) => {
    if (disabledDays.includes(day)) return;
    setSelectedDays(prev => (prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]));
  };

  const handleBack = () => {
    if (currentLanguage === 'ar') {
      containerRef.current?.classList.add('page-exit-forward');
    } else {
      containerRef.current?.classList.add('page-exit-back');
    }

    setTimeout(() => {
      navigate('/signup/1');
    }, 500);
  };

  const handleNext = () => {
    if (currentLanguage === 'ar') {
      containerRef.current?.classList.add('page-exit-back');
    } else {
      containerRef.current?.classList.add('page-exit-forward');
    }
    set({ ...registrationData, selectedDays })
      .then(() => {
        setTimeout(() => {
          navigate('/signup/3');
        }, 500);
      })
      .catch(() =>
        setTimeout(() => {
          setError(true);
        }, 500)
      );
  };

  return (
    <>
      {error && <Error />}
      <div className="container">
        <div ref={containerRef} className="container-box">
          <h1>{t('page2_title')}</h1>
          <div className="days-picker">
            {DAYS.map((day, i) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`day-button ${selectedDays.includes(day) ? 'selected' : ''} ${
                  disabledDays.includes(day) ? 'disabled' : ''
                }`}
                disabled={disabledDays.includes(day)}
              >
                <span className={i !== DAYS.length - 1 ? 'spanSeperator' : ''}>
                  <p>{t(day)}</p>
                  {selectedDays.includes(day) && <p>✓</p>}
                </span>
              </button>
            ))}
          </div>
          <div className="button-group">
            <button onClick={handleBack}>{t('back')}</button>
            <button onClick={handleNext} disabled={selectedDays.length === 0}>
              {t('next')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page2;
