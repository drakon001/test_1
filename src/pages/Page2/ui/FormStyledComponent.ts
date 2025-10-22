import styled from 'styled-components';
export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Input = styled.input<{ hasError: boolean }>`
 
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${props => props.hasError ? '#e53e3e' : '#e2e8f0'};
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e53e3e' : '#3182ce'};
  }
  
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
 
`;

export const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;