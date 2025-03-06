import { useState, useId, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSessionStorage } from '../utils/hooks/useSessionStorage';

import Error from '../components/error/Error';

function Page1() {
  const [get, set] = useSessionStorage();
  const [registrationData, setRegistrationData] = useState(get);
  const [error, setError] = useState(false);

  const heightLabelId = useId();
  const weightLabelId = useId();

  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleNext = () => {
    containerRef.current?.classList.add('page-exit-forward');
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
      <div ref={containerRef} className="container">
        <h1>Let's hear more about you to prepare your personal workout plan</h1>
        <div className="form-group">
          <label htmlFor={heightLabelId}>
            Your Height (cm):
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
              placeholder="Enter your height"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor={weightLabelId}>
            Your Weight (kg):
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
              placeholder="Enter your weight"
            />
          </label>
        </div>
        <div className="button-group">
          <button disabled>Back</button>
          <button
            onClick={handleNext}
            disabled={!registrationData.height || !registrationData.weight}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Page1;
