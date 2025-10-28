import styled, { keyframes } from 'styled-components';

export const Page3Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
 width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1976d2;
  border-radius: 50%;
  margin-bottom: 20px;
  animation: ${spin} 1s linear infinite;
`;

export const ErrorContainer = styled.div`
  text-align: center;
  padding: 40px 20px;
  background-color: #ffebee;
  border-radius: 8px;
  border-left: 4px solid #d32f2f;

  & h2 {
    color: #d32f2f;
    margin-bottom: 10px;
  }
`;

export const RetryButton = styled.button`
  padding: 10px 20px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background-color: #1565c0;
  }
`;

export const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #777;
`;


export const BlockInfo = styled.div`
  margin-top: 15px;
  text-align: center;
  color: #777;
  font-size: 14px;
`;
