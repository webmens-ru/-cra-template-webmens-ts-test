import React from "react";
import { CheckboxFormatterProps } from "react-data-grid";

export default function CheckboxFormatter({ disabled, onChange, ...props }: CheckboxFormatterProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked, (event.nativeEvent as MouseEvent).shiftKey)
  }
  
  return <input type="checkbox" {...props} onChange={handleChange} />
}
