import React, { useEffect, useReducer } from "react";
import { reducer, init } from "./reducer";
import Input from "../input";
import Select from "../select";
import { ComboContainer, FieldAdd, FieldRemove, MultifieldContainer, MultifieldItemContainer } from "./styles";
import { IMultifieldProps, MultifieldItem, MultifieldItemComboValue } from "./types";
import { Icon } from "../icon";
import { IInputProps, InputValue } from "../input/types";
import { ISelectProps, SelectPropsValue } from "../select/types";

export const Multifield = ({
  type = "input",
  minLimit = 1,
  maxLimit = Infinity,
  fieldParams = {},
  addTitle = "Добавить",
  fields = [],
  comboParams = {},
  onChange = () => {}
}: IMultifieldProps) => {
  const [state, dispatch] = useReducer(reducer, {
    type,
    minLimit,
    maxLimit,
    fields,
    comboParams,
    onChange
  }, init)

  useEffect(() => {
    onChange(state.fields)
  }, [state.fields])

  const canRemove = state.fields.length > minLimit
  const canAdd = state.fields.length < maxLimit

  const getField = (field: MultifieldItem) => {
    switch (type) {
      case "input":
        return <Input {...fieldParams as IInputProps} value={field.value as InputValue} onChange={(value) => handleFieldChange(value, field)} />
      case "select":
        return <Select {...fieldParams as ISelectProps} value={field.value as SelectPropsValue} onChange={(value) => handleFieldChange(value, field)} />
      case "combo":
        const value = (typeof field !== "number" && "value" in field) ? field.value as MultifieldItemComboValue : field as unknown as MultifieldItemComboValue
        return (
          <ComboContainer>
            <Input {...fieldParams as IInputProps} value={value.text} onChange={(value) => handleComboFieldChange(value, field, 'input')} />
            <Select {...comboParams} value={value.type} onChange={(value) => handleComboFieldChange(value, field, 'select')} />
          </ComboContainer>
        )
    }
  }

  const handleFieldChange = (value: InputValue|SelectPropsValue, field: MultifieldItem) => {   
    dispatch({type: "SET_VALUE", payload: {field, value}})
  }

  const handleComboFieldChange = (value: InputValue|SelectPropsValue, field: MultifieldItem, type: 'input'|'select') => {
    dispatch({type: 'SET_COMBO_VALUE', payload: {value, field, type}})
  }

  const addField = () => {
    dispatch({type: 'ADD_FIELD'})
  }

  const removeField = (field: MultifieldItem) => {
    dispatch({type: "REMOVE_FIELD", payload: {field}})
  }
  
  return (
    <MultifieldContainer>
      {state.fields
        .sort((prev, current) => prev.order - current.order)
        .map(field => {
          return (
            <MultifieldItemContainer key={field.key}>
              {/* <FieldDrag>
                <Icon iconWidth="24px" iconName="menu" />
              </FieldDrag> */}
              {getField(field)}
              <FieldRemove canRemove={canRemove} title={canRemove ? "Удалить поле" : `Минимальное количество - ${minLimit} поле`}>
                <Icon iconWidth="24px" iconName="close" onClick={() => removeField(field)} />
              </FieldRemove>
            </MultifieldItemContainer>
          )
        })}
        <FieldAdd 
          children={addTitle} 
          canAdd={canAdd}
          title={canAdd ? "Добавить поле" : `Достигнуто ограничение в ${maxLimit} полей`}
          onClick={addField} 
        />
    </MultifieldContainer>
  )
}
