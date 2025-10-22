import React from 'react';
import { StatsContainer, StatsItem, StatsLabel, StatsValueContainer } from '../ui/StatsCardStyledComponents';
import type { StatsCardProps } from '../types';

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