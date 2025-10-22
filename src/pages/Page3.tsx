import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Page3.css';

interface HistoryItem {
  date: string;
  first_name: string;
  last_name: string;
  count: number;
}

interface HistoryResponse {
  items: HistoryItem[];
}

const Page3: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        setError('');       
        const response = await axios.get<HistoryResponse>('/api/v1/history');
        setHistory(response.data.items);
      } catch (err: any) {
        console.error('Ошибка загрузки истории:', err);
        setError('Не удалось загрузить историю отправок');
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);
  // Подсчет общего количества отправок
  const totalCount = history.reduce((sum, item) => sum + item.count, 0);

  if (loading) {
    return (
      <div className="page3">
        <Link to="/">Go back to Home</Link>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Загрузка истории отправок...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page3">
        <Link to="/">Go back to Home</Link>
        <div className="error-container">
          <h2>Ошибка</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page3">
      <Link to="/">Go back to Home</Link>
      <h1>История успешных отправок</h1>
      
      {history.length === 0 ? (
        <div className="empty-state">
          <p>Нет данных об отправках</p>
        </div>
      ) : (
        <>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Всего записей:</span>
              <span className="stat-value">{history.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Общее количество отправок:</span>
              <span className="stat-value">{totalCount}</span>
            </div>
          </div>

          <div className="table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Имя</th>
                  <th>Фамилия</th>
                  <th>Количество отправок</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                    <td className="date-cell">
                      <small className="date-original">{item.date}</small>
                    </td>
                    <td className="name-cell">{item.first_name}</td>
                    <td className="name-cell">{item.last_name}</td>
                    <td className="count-cell">
                      <span className={`count-badge ${item.count > 5 ? 'high' : item.count > 2 ? 'medium' : 'low'}`}>
                        {item.count}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="footer-total">Всего:</td>
                  <td className="footer-count">{totalCount}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="table-info">
            <p>Показано {history.length} записей</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Page3;