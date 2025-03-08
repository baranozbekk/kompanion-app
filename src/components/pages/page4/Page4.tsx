import { useState, useEffect, useRef, useMemo, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useSessionStorage } from '../../../utils/hooks/useSessionStorage';

import Error from '../../error/Error';

import './Page4.css';

interface FormValues {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface FormikActions {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
}

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
      name: cachedName = '',
      surname: cachedSurname = '',
      email: cachedEmail = '',
      password: cachedPassword = '',
    } = {},
  } = registrationData;

  const FeedbackSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().min(2, t('too_short')).max(50, t('too_long')).required(t('required')),
        surname: Yup.string().min(2, t('too_short')).max(50, t('too_long')).required(t('required')),
        email: Yup.string().email(t('must_be_email')).required(t('required')),
        password: Yup.string()
          .min(2, t('too_short'))
          .max(50, t('too_long'))
          .required(t('required')),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentLanguage]
  );

  const saving = useMemo(
    () => t('saving'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentLanguage]
  );

  const saved = useMemo(
    () => t('saved'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentLanguage]
  );

  const nameFieldId = useId();
  const surnameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const initialValues = {
    name: cachedName,
    surname: cachedSurname,
    email: cachedEmail,
    password: cachedPassword,
  };

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

  const handleSubmit = (values: FormValues, actions: FormikActions) => {
    if (headingRef.current) {
      headingRef.current.textContent = saving;
      setTimeout(() => {
        if (headingRef.current) {
          headingRef.current.textContent = saved;
          setRegistrationData({});
        }
      }, 1000);
    }

    set({ ...registrationData, formData: values })
      .then(() => {
        setTimeout(() => {
          actions.resetForm();
        }, 500);
        console.log('This is where we handle the request');
        console.log('Data: ', { ...registrationData, formData: values });
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
          <h1 ref={headingRef}>{t('page4_title')}</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={FeedbackSchema}
            enableReinitialize={true}
          >
            {({ isValid }) => (
              <Form className="form-container">
                <div className="form-batch">
                  <div className="form-batch1">
                    <div className="form-group">
                      <label htmlFor={nameFieldId}>
                        <Field id={nameFieldId} type="text" name="name" placeholder={t('name')} />
                      </label>
                      <ErrorMessage
                        name="name"
                        component="p"
                        className={currentLanguage === 'ar' ? 'text-align-right' : ''}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={surnameFieldId}>
                        <Field
                          id={surnameFieldId}
                          type="text"
                          name="surname"
                          placeholder={t('surname')}
                        />
                      </label>
                      <ErrorMessage
                        name="surname"
                        component="p"
                        className={currentLanguage === 'ar' ? 'text-align-right' : ''}
                      />
                    </div>
                  </div>
                  <div className="form-batch2">
                    <div className="form-group">
                      <label htmlFor={emailFieldId}>
                        <Field
                          id={emailFieldId}
                          type="email"
                          name="email"
                          placeholder={t('email')}
                        />
                      </label>
                      <ErrorMessage
                        name="email"
                        component="p"
                        className={currentLanguage === 'ar' ? 'text-align-right' : ''}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={passwordFieldId}>
                        <Field
                          id={passwordFieldId}
                          type="password"
                          name="password"
                          placeholder={t('password')}
                        />
                      </label>
                      <ErrorMessage
                        name="password"
                        component="p"
                        className={currentLanguage === 'ar' ? 'text-align-right' : ''}
                      />
                    </div>
                  </div>
                </div>
                <div className="button-group">
                  <button type="button" onClick={handleBack}>
                    {t('back')}
                  </button>
                  <button type="submit" disabled={!isValid}>
                    {t('save')}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Page4;
