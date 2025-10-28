import React from 'react';
import styled from 'styled-components';

interface StatsCardProps {
  totalCount: number;
  historyLength: number;
}

const StatsContainer = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;
const StatsItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatsLabel = styled.span`
  font-size: 14px;
  color: #777;
  margin-bottom: 5px;
`;

const StatsValueContainer = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #1976d2;
`;

export const StatsCard: React.FC<StatsCardProps> = ({
  totalCount,
  historyLength
}) => {

  return (
    <StatsContainer>
      <StatsItem>
        <StatsLabel>Всего записей:</StatsLabel>
        <StatsValueContainer>{historyLength}</StatsValueContainer>
      </StatsItem>
      <StatsItem>
        <StatsLabel>Общее количество отправок:</StatsLabel>
        <StatsValueContainer>{totalCount}</StatsValueContainer>
      </StatsItem>
    </StatsContainer>
  )

}