import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useSessionStorage } from '../../utils/hooks/useSessionStorage';

import Error from '../error/Error';

function Page3() {
  const {
    t,
    i18n: { language: currentLanguage },
  } = useTranslation();
  const [get, set] = useSessionStorage();
  const [registrationData, setRegistrationData] = useState(get);
  const [error, setError] = useState(false);
  const {
    height = null,
    weight = null,
    selectedDays = null,
    goal: cachedGoal = null,
  } = registrationData;
  const [goal, setGoal] = useState('lose-weight');

  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!height || !weight) {
      navigate('/signup/1');
      return;
    }
    if (!selectedDays || !selectedDays.length) {
      navigate('/signup/2');
      return;
    }
    if (cachedGoal) {
      setGoal(cachedGoal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    if (currentLanguage === 'ar') {
      containerRef.current?.classList.add('page-exit-forward');
    } else {
      containerRef.current?.classList.add('page-exit-back');
    }

    setTimeout(() => {
      navigate('/signup/2');
    }, 500);
  };

  const handleNext = () => {
    if (currentLanguage === 'ar') {
      containerRef.current?.classList.add('page-exit-back');
    } else {
      containerRef.current?.classList.add('page-exit-forward');
    }

    set({ ...registrationData, goal })
      .then(() => {
        setTimeout(() => {
          navigate('/signup/4');
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
        <h1>{t('page3_title')}</h1>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="lose-weight"
              checked={goal === 'lose-weight'}
              onChange={e => setGoal(e.target.value)}
            />
            {t('lose_weight')}
          </label>
          <label>
            <input
              type="radio"
              value="build-muscle"
              checked={goal === 'build-muscle'}
              onChange={e => setGoal(e.target.value)}
            />
            {t('build_muscle')}
          </label>
          <label>
            <input
              type="radio"
              value="stay-healthy"
              checked={goal === 'stay-healthy'}
              onChange={e => setGoal(e.target.value)}
            />
            {t('stay_healthy')}
          </label>
        </div>
        <div className="button-group">
          <button onClick={handleBack}>{t('back')}</button>
          <button onClick={handleNext}>{t('next')}</button>
        </div>
      </div>
    </>
  );
}

export default Page3;
