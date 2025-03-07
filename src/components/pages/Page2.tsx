import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useSessionStorage } from '../../utils/hooks/useSessionStorage';

import Error from '../error/Error';

const DAYS2 = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function Page2() {
  const {
    t,
    i18n: { language: currentLanguage },
  } = useTranslation();
  const [get, set] = useSessionStorage();
  const [registrationData, setRegistrationData] = useState(get);
  const [error, setError] = useState(false);
  // const [daySelection, setDaySelection] = useState(window.localStorage.getItem('i18nextLng'));
  const {
    height = null,
    weight = null,
    selectedDays: cachedSelectedDays = null,
  } = registrationData;
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [disabledDays, setDisabledDays] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  // const DAYS = useMemo(() => {
  //   return [
  //     t('monday'),
  //     t('tuesday'),
  //     t('wednesday'),
  //     t('thursday'),
  //     t('friday'),
  //     t('saturday'),
  //     t('sunday'),
  //   ];
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentLanguage]);

  useEffect(() => {
    if (!height || !weight) {
      navigate('/signup/1');
      return;
    }
    if (Number(weight) / Number(height) > 0.5) {
      // setDisabledDays([t('tuesday'), t('thursday'), t('friday')]);
      setDisabledDays(['tuesday', 'thursday', 'friday']);
    }
    if (cachedSelectedDays) {
      setSelectedDays(cachedSelectedDays);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (!height || !weight) {
  //     navigate('/signup/1');
  //     return;
  //   }
  //   if (Number(weight) / Number(height) > 0.5) {
  //     setDisabledDays([t('tuesday'), t('thursday'), t('friday')]);
  //   }
  //   if (cachedSelectedDays) {
  //     setSelectedDays(cachedSelectedDays);
  //   }
  // }, [height, weight, navigate, cachedSelectedDays, t]);

  // Subscribe to the localstorage's language value
  // useEffect(() => {
  //   const newLocalStorage = window.localStorage.getItem('i18nextLng');
  //   if (daySelection !== newLocalStorage) {
  //     setDaySelection(newLocalStorage);
  //     setSelectedDays([]);
  //     const newRegistartionData = { ...registrationData };
  //     delete newRegistartionData.selectedDays;
  //     setRegistrationData(newRegistartionData);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [window.localStorage.getItem('i18nextLng')]);

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
      <div ref={containerRef} className="container">
        <h1>{t('page2_title')}</h1>
        <div className="days-picker">
          {DAYS2.map(day => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`day-button ${selectedDays.includes(day) ? 'selected' : ''} ${
                disabledDays.includes(day) ? 'disabled' : ''
              }`}
              disabled={disabledDays.includes(day)}
              style={{ color: 'black' }}
            >
              {t(day)}
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
    </>
  );
}

export default Page2;
