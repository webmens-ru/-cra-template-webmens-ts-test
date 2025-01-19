import React from 'react';
import { IFieldProps } from './types.js';
import {
  FieldContainer,
  FieldLabel,
  FieldLabelContainer,
  FieldLabelSuffix,
  ValidateMessage,
} from './styles';

const Field = ({
  label,
  labelSuffix,
  errors = [],
  name,
  children,
}: IFieldProps) => {
  return (
    <FieldContainer>
      {(label || labelSuffix) && (
        <FieldLabelContainer>
          <FieldLabel children={label} />
          {labelSuffix && <FieldLabelSuffix children={`(${labelSuffix})`} />}
        </FieldLabelContainer>
      )}
      {children}
      {errors.length > 0 &&
        errors
          .filter((error) => error.field === name)
          .map((error, index) => (
            <ValidateMessage key={index} children={error.message} />
          ))}
    </FieldContainer>
  );
};

export default Field;
