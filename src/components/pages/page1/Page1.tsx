import { useState, useId, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSessionStorage } from '../../../utils/hooks/useSessionStorage';

import Error from '../../error/Error';

import { useTranslation } from 'react-i18next';

import './Page1.css';

function Page1() {
  const {
    t,
    i18n: { language: currentLanguage },
  } = useTranslation();
  const [get, set] = useSessionStorage();
  const [registrationData, setRegistrationData] = useState(get);
  const [error, setError] = useState(false);

  const heightLabelId = useId();
  const weightLabelId = useId();

  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleNext = () => {
    if (currentLanguage === 'ar') {
      containerRef.current?.classList.add('page-exit-back');
    } else {
      containerRef.current?.classList.add('page-exit-forward');
    }
    set(registrationData)
      .then(() => {
        setTimeout(() => {
          navigate('/signup/2');
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
          <div className="heading-container">
            <h1>{t('page1_title')}</h1>
          </div>
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor={heightLabelId}>
                <input
                  id={heightLabelId}
                  type="number"
                  value={registrationData?.height ?? ''}
                  onChange={e =>
                    setRegistrationData((prev: { height?: number; weight?: number }) => ({
                      ...prev,
                      height: e.target.value,
                    }))
                  }
                  placeholder={t('page1_input1_placeholder')}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor={weightLabelId}>
                <input
                  id={weightLabelId}
                  type="number"
                  value={registrationData?.weight ?? ''}
                  onChange={e =>
                    setRegistrationData((prev: { height?: number; weight?: number }) => ({
                      ...prev,
                      weight: e.target.value,
                    }))
                  }
                  placeholder={t('page1_input2_placeholder')}
                />
              </label>
            </div>
          </div>
          <div className="button-group">
            <button disabled>{t('back')}</button>
            <button
              onClick={handleNext}
              disabled={!registrationData.height || !registrationData.weight}
            >
              {t('next')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page1;
