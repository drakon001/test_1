import styled from 'styled-components';

export const StatsContainer = styled.div`
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

export const StatsItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StatsLabel = styled.span`
  font-size: 14px;
  color: #777;
  margin-bottom: 5px;
`;

export const StatsValueContainer = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #1976d2;
`;
