import styled, { keyframes } from 'styled-components';

export const Page2Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;


export const Page2Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const GeneralError  = styled.div`
  color: #d32f2f;
  font-size: 14px;
  margin-top: 5px;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  border-left: 4px solid #d32f2f;
`;

export const Page2SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.3s;


  &:hover:not(:disabled) {
    background-color: #1565c0;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const Page2DataContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: #365137; 
  border-radius: 8px;
  border-left: 4px solid #4caf50;

  & h2 {
    margin-top: 0;
    color: #2e7d32;
  }

  & ul {
    list-style: none;
    padding: 0;
  }

  & li {
    padding: 8px 0;
    border-bottom: 1px solid #c8e6c9;
  }

  & li:last-child {
    border-bottom: none;
  }
`;
