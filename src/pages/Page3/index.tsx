import React from 'react';
import { Link } from 'react-router-dom';
import { usePage3Request } from './api/usePage3Request';
import { BlockInfo, EmptyStateContainer, ErrorContainer, LoadingContainer, Page3Container, RetryButton, Spinner } from './ui/StyledComponents';
import type { IRoutes } from '../../app/routes';
import { StatsCard } from './widgets/StatsCard';
import { Page3HistoryTable } from './widgets/Page3HistoryTable';

const homeRoute = "/" satisfies IRoutes;
const reload = () => window.location.reload()
const Page3: React.FC = () => {
  const {history, loading, error, totalCount } = usePage3Request()
 
  if (loading) {
    return (
      <Page3Container>
        <Link to="/">Go back to Home</Link>
        <LoadingContainer>
          <Spinner />
          <p>Загрузка истории отправок...</p>
        </LoadingContainer>
      </Page3Container>
    );
  }

  if (error) {
    return (
      <Page3Container>
        <Link to="/">Go back to Home</Link>
        <ErrorContainer>
          <h2>Ошибка</h2>
          <p>{error}</p>
          <RetryButton onClick={reload}>
            Попробовать снова
          </RetryButton>
        </ErrorContainer>
      </Page3Container>
    );
  }

  return (
    <Page3Container>
      <Link to={homeRoute}>Go back to Home</Link>
      <h1>История успешных отправок</h1>
      
      {history.length === 0 ? (
        <EmptyStateContainer>
          <p>Нет данных об отправках</p>
        </EmptyStateContainer>
      ) : (
        <>
          <StatsCard totalCount={totalCount} historyLength={history.length} />
          <Page3HistoryTable  history={history} totalCount={totalCount}/>
          <BlockInfo>
            <p>Показано {history.length} записей</p>
          </BlockInfo>
        </>
      )}
    </Page3Container>
  );
};

export default Page3;