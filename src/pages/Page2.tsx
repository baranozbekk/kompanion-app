import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function Page2() {
  console.log(Date.now());
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [disabledDays, setDisabledDays] = useState<string[]>([]);

  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem('registrationData') || '{}');
    const { height, weight } = savedData;

    if (height && weight) {
      const ratio = Number(weight) / Number(height);
      if (ratio > 0.5) {
        setDisabledDays(['Tuesday', 'Thursday', 'Friday']);
      }
    }

    if (savedData.selectedDays) {
      setSelectedDays(savedData.selectedDays);
    }
  }, []);

  const toggleDay = (day: string) => {
    if (disabledDays.includes(day)) return;

    setSelectedDays(prev => (prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]));
  };

  const handleBack = () => {
    const container = document.querySelector('.container');
    container?.classList.add('page-exit-back');

    setTimeout(() => {
      navigate('/signup/1');
    }, 400);
  };

  const handleNext = () => {
    const container = document.querySelector('.container');
    container?.classList.add('page-exit-forward');

    setTimeout(() => {
      const data = {
        ...JSON.parse(sessionStorage.getItem('registrationData') || '{}'),
        selectedDays,
      };
      sessionStorage.setItem('registrationData', JSON.stringify(data));
      navigate('/signup/3');
    }, 400);
  };

  return (
    <div className="container">
      <h1>Pick your workout days</h1>
      <div className="days-picker">
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => toggleDay(day)}
            className={`day-button ${selectedDays.includes(day) ? 'selected' : ''} ${
              disabledDays.includes(day) ? 'disabled' : ''
            }`}
            disabled={disabledDays.includes(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="button-group">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleNext} disabled={selectedDays.length === 0}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Page2;
