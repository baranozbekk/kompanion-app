import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Page3() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState('lose-weight');

  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem('registrationData') || '{}');
    if (savedData.goal) {
      setGoal(savedData.goal);
    }
  }, []);

  const handleBack = () => {
    const container = document.querySelector('.container');
    container?.classList.add('page-exit-back');

    setTimeout(() => {
      navigate('/signup/2');
    }, 300);
  };

  const handleNext = () => {
    const container = document.querySelector('.container');
    container?.classList.add('page-exit-forward');

    setTimeout(() => {
      const data = {
        ...JSON.parse(sessionStorage.getItem('registrationData') || '{}'),
        goal,
      };
      sessionStorage.setItem('registrationData', JSON.stringify(data));
      navigate('/signup/4');
    }, 300);
  };

  return (
    <div className="container">
      <h1>What is your fitness goal?</h1>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="lose-weight"
            checked={goal === 'lose-weight'}
            onChange={e => setGoal(e.target.value)}
          />
          Lose weight
        </label>
        <label>
          <input
            type="radio"
            value="build-muscle"
            checked={goal === 'build-muscle'}
            onChange={e => setGoal(e.target.value)}
          />
          Build muscle
        </label>
        <label>
          <input
            type="radio"
            value="stay-healthy"
            checked={goal === 'stay-healthy'}
            onChange={e => setGoal(e.target.value)}
          />
          Stay healthy
        </label>
      </div>
      <div className="button-group">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default Page3;
