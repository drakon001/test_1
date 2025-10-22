import React, { useCallback, useId } from 'react';
import type { FormFieldProps } from '../types';
import { ErrorMessage, FieldContainer, Input, Label } from '../ui/FormStyledComponent';

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