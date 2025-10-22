import { Link } from 'react-router-dom'
import React, { useState, useEffect, type FormEvent } from 'react';
import axios from 'axios';
import './Page2.css'

// Типы для TypeScript
interface FormData {
  date: string;
  first_name: string;
  last_name: string;
}

interface BackendError {
  [key: string]: string[];
}

interface BackendResponse {
  success: boolean;
  data?: Array<{
    date: string;
    name: string;
  }>;
  error?: BackendError;
}

interface SuccessData {
  date: string;
  name: string;
}

const Page2: React.FC = () => {
  // Состояния компонента
  const [formData, setFormData] = useState<FormData>({
    date: '',
    first_name: '',
    last_name: ''
  });
  const [errors, setErrors] = useState<BackendError>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [successData, setSuccessData] = useState<SuccessData[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Восстановление состояния из URL при монтировании
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const restoredData: FormData = {
      date: urlParams.get('date') || '',
      first_name: urlParams.get('first_name') || '',
      last_name: urlParams.get('last_name') || ''
    };
    setFormData(restoredData);
    setIsMounted(true);
  }, []);

  // Обновление URL при изменении formData (только после монтирования)
  useEffect(() => {
    if (!isMounted) return;
    const urlParams = new URLSearchParams();
    if (formData.date) urlParams.set('date', formData.date);
    if (formData.first_name) urlParams.set('first_name', formData.first_name);
    if (formData.last_name) urlParams.set('last_name', formData.last_name);
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }, [formData, isMounted]);



  // Обработчик изменений в полях формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Очищаем ошибку для поля при изменении
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessData([]);

    try {
      const response = await axios.post<BackendResponse>('/api/v1/submit', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.data.success && response.data.data) {
        setSuccessData(response.data.data);
      } else if (response.data.error) {
        setErrors(response.data.error);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        // Обработка ошибок валидации с бэкенда
        const backendError = error.response.data as BackendResponse;
        if (backendError.error) {
          setErrors(backendError.error);
        }
      } else {
        // Обработка других ошибок
        setErrors({
          general: ['Произошла ошибка при отправке формы. Попробуйте еще раз.']
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page2">
      <Link to="/">Go back to Home</Link>
      <h1>Форма отправки данных</h1>

      <form onSubmit={handleSubmit} className="form">
        {/* Поле Date */}
        <div className="form-field">
          <label htmlFor="date">Дата:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            disabled={loading}
          />
          {errors.date && (
            <div className="error">{errors.date.join(', ')}</div>
          )}
        </div>

        {/* Поле First Name */}
        <div className="form-field">
          <label htmlFor="first_name">Имя:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="Введите имя"
          />
          {errors.first_name && (
            <div className="error">{errors.first_name.join(', ')}</div>
          )}
        </div>

        {/* Поле Last Name */}
        <div className="form-field">
          <label htmlFor="last_name">Фамилия:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="Введите фамилию"
          />
          {errors.last_name && (
            <div className="error">{errors.last_name.join(', ')}</div>
          )}
        </div>

        {/* Общие ошибки */}
        {errors.general && (
          <div className="error general-error">
            {errors.general.join(', ')}
          </div>
        )}

        {/* Кнопка отправки и спиннер */}
        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? (
            <>
              <div className="spinner"></div>
              Отправка...
            </>
          ) : (
            'Отправить'
          )}
        </button>
      </form>

      {/* Отображение успешных данных */}
      {successData.length > 0 && (
        <div className="success-data">
          <h2>Данные с сервера:</h2>
          <ul>
            {successData.map((item, index) => (
              <li key={index}>
                <strong>Дата:</strong> {item.date}, <strong>Имя:</strong> {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Page2;