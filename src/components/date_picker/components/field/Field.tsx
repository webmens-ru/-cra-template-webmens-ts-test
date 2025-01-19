import React, { StrictMode, useMemo } from 'react';
import { FieldProps } from '.';
import { DateField } from './field_types/date';

/**
 * 
 * @param type - one of "date" 
 * @param variant - one of "with_border" | "dashed_underline" | "text_bold"
 * @param onSelect - return date in ISO8601 if correct
 * @param props - css properties for container
 * @returns 
 */

export function Field({ type, variant, onSelect, ...props }: FieldProps) {
  const switchField = useMemo(() => {
    switch (type) {
      case 'date':
        return (
          <DateField
            variant={variant}
            type={type}
            onSelect={onSelect}
            {...props}
          />
        );
      default:
        return <p>type error</p>;
    }
  }, [onSelect, props, type, variant]);

  return <StrictMode>{switchField}</StrictMode>;
}
