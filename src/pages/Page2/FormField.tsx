import React, { useCallback, useId } from 'react';
import styled from 'styled-components';
import type { Page2BackendError, Page2FormData } from './types';

interface FormFieldProps {
  name: keyof Page2FormData;
  type: "date" | "text";
  data: Page2FormData;
  label: string;
  onChange: (name: string, value: string ) => void;
  errors: Page2BackendError;
  disabled?: boolean;
  id?: string;
  placeholder?:string;
}

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input<{ hasError: boolean }>`
 
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

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const FormField: React.FC<FormFieldProps> = ({
  name,
  data,
  label,
  type,
  onChange,
  errors,
  disabled = false,
  id,
  placeholder
}) => {
  const field_error: string[] = errors[name] || [];
  const fieldId = id || useId();
  const value: string = data[name] || ''

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(name, value)
  },[onChange])


  return (
    <FieldContainer>
      <Label htmlFor={fieldId}>
        {label}
      </Label>
      <Input
        type={type}
        id={fieldId}
        name={name}
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        hasError={field_error.length > 0}
        placeholder={placeholder}
      />
      {field_error.length > 0 && (
        <ErrorMessage>{field_error.join(', ')}</ErrorMessage>
      )}
    </FieldContainer>
  );
};