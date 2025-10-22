import { Link } from 'react-router-dom'
import React, { useState, useCallback } from 'react';
import type { Page2FormData } from './types';
import { usePage2Request } from './api/usePage2Request';
import { useUrlForm } from './hooks/useUrlForm';

import { FormField } from './widgets/FormField';
import { GeneralError, Page2Container, Page2DataContainer,
   Page2Form, Page2SubmitButton, Spinner } from './ui/StyledComponents';
import { fieldsMeta, homeRoute } from './conf';


const Page2: React.FC = () => {
  const [formData, setFormData] = useState<Page2FormData>({
    date: '',
    first_name: '',
    last_name: ''
  });

  const {
    handleSubmit,
    loading,
    errors,
    setErrors,
    data
  } = usePage2Request(formData);

  useUrlForm(formData, setFormData)

  const handleInputChange = useCallback( (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [setFormData, setErrors]);

  return (
    <Page2Container>
      <Link to={homeRoute}>Go back to Home</Link>
      <h1>Форма отправки данных</h1>
      <Page2Form onSubmit={handleSubmit}>
        {Object.values(fieldsMeta).map(meta => 
          <FormField
            key={meta.name}
            label={meta.label}
            type={meta.type}
            name={meta.name}
            data={formData}
            onChange={handleInputChange}
            disabled={loading}
            errors={errors}
          />
        )}
        {errors.general && (
          <GeneralError>
            {errors.general.join(', ')}
          </GeneralError>
        )}
        <Page2SubmitButton
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner />
              Отправка...
            </>
          ) : (
            'Отправить'
          )}
        </Page2SubmitButton>
      </Page2Form>
      {data.length > 0 && (
        <Page2DataContainer>
          <h2>Данные с сервера:</h2>
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <strong>Дата:</strong> {item.date}, <strong>Имя:</strong> {item.name}
              </li>
            ))}
          </ul>
        </Page2DataContainer>
      )}
    </Page2Container>
  );
};

export default Page2;