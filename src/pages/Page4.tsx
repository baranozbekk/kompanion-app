import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Page4() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem('registrationData') || '{}');
    if (savedData.name) {
      setFormData({
        name: savedData.name || '',
        surname: savedData.surname || '',
        email: savedData.email || '',
        password: savedData.password || '',
      });
    }
  }, []);

  const handleBack = () => {
    const container = document.querySelector('.container');
    container?.classList.add('page-exit-back');

    setTimeout(() => {
      navigate('/signup/3');
    }, 300);
  };

  const handleSave = () => {
    const container = document.querySelector('.container');
    container?.classList.add('page-exit-forward');

    setTimeout(() => {
      const finalData = {
        ...JSON.parse(sessionStorage.getItem('registrationData') || '{}'),
        ...formData,
      };
      sessionStorage.setItem('registrationData', JSON.stringify(finalData));
      console.log('Final Registration Data:', finalData);
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container">
      <h1>Final step. Complete your registration</h1>
      <div className="form-group">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Surname:
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Enter your surname"
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </label>
      </div>
      <div className="button-group">
        <button onClick={handleBack}>Back</button>
        <button
          onClick={handleSave}
          disabled={!formData.name || !formData.surname || !formData.email || !formData.password}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Page4;
