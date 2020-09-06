import React, { ChangeEvent, FC } from 'react';
import { FieldProps } from 'typings';

import { Container, Label, Input } from './styles';
import { ErrorMessage } from 'components/styles';

const Field: FC<FieldProps> = ({
  id,
  label,
  onChange,
  errorMessage,
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange(e.target.value as never);
  };

  return (
    <Container>
      <Label htmlFor={id} errorMessage={errorMessage}>
        {label}
      </Label>
      <Input
        id={id}
        errorMessage={errorMessage}
        onChange={handleChange}
        {...rest}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
};

export default Field;
