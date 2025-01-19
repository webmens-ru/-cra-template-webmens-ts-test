import React, { useState } from 'react';
import { Icon } from '../icon';
import { InputContainer, PostfixIconContainer, PrefixIconContainer } from './styles';
import { IInputProps } from './types';

export const Input = ({
  value = '',
  placeholder = '',
  readonly = false,
  iconPosition = "none",
  iconLeftName = "none",
  iconRightName = "none",
  nativeInputProps = {},
  width = "100%",
  onChange = () => { },
  onFocus = () => { },
  onBlur = () => { },
}: IInputProps) => {
  const [input, setInput] = useState({ value, focus: false })

  // Срабатывает при изменении значения в поле
  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let value = evt.target.value
    const newValue = onChange(value)

    if (newValue !== undefined) {
      value = newValue
    }

    setInput({ ...input, value })
  }

  // Срабатывает при фокусе
  const handleInputFocused = () => {
    setFocus(true)
    onFocus()
  }

  // Срабатывает при выходе из фокуса
  const handleInputBlured = () => {
    setFocus(false)
    onBlur()
  }

  // Записывает в state, что поле находится в фокусе (для отображения рамки у контейнера)
  const setFocus = (focus: boolean) => {
    setInput({ ...input, focus })
  }

  return (
    <InputContainer readonly={readonly} focus={input.focus} width={width} >
      {(iconPosition === "left" || iconPosition === "both") && (
        <PrefixIconContainer>
          <Icon iconName={iconLeftName} iconWidth="18px" />
        </PrefixIconContainer>
      )}
      <input
        type="text"
        value={input.value}
        placeholder={placeholder}
        readOnly={readonly}
        onChange={handleInputChange}
        onFocus={handleInputFocused}
        onBlur={handleInputBlured}
        {...nativeInputProps}
      />
      {(iconPosition === "right" || iconPosition === "both") && (
        <PostfixIconContainer>
          <Icon iconName={iconRightName} iconWidth="18px" />
        </PostfixIconContainer>
      )}
    </InputContainer>
  )
}
