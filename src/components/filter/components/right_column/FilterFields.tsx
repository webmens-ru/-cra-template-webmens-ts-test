import React, { useCallback } from 'react';
import { useCustomContext } from '../../store/Context';
import { TField } from '../../types';
import FieldWrapper from './field_wrapper';
import DateField from './filter_fields/Date';
import { SelectWrapper } from './filter_fields/Select';
import SelectIntegerField from './filter_fields/SelectInteger';
import SelectStringField from './filter_fields/SelectString';

export function FilterFields() {
  const { state, dispatch } = useCustomContext();

  const hideField = useCallback((field: TField) => {
    state.updateField({ ...field, visible: false }, 'hide');
    dispatch({ type: 'UPDATE_FILTER_FIELD', field });
  }, [dispatch, state])

  const handleMoveFields = useCallback((dragField: TField, hoverField: TField) => {
    const [dragOrder, hoverOrder] = [dragField.order, hoverField.order]
    
    if (dragOrder === hoverOrder) {
      hoverField.order += 1
    } else {
      dragField.order = hoverOrder
      hoverField.order = dragOrder
    }

    const reorderedFields = [
      ...state.fields.filter((field) => field.id !== dragField.id && field.id !== hoverField.id),
      dragField,
      hoverField
    ]

    dispatch({ type: "SET_FILTER_FIELDS", fields: reorderedFields })
  }, [dispatch, state.fields])

  const handleDragEnd = useCallback(() => {
    state.updateFieldsOrder(state.fields)
  }, [state])

  const getFieldByType = (type: string, props: any) => {
    switch (type) {
      case 'integer':
      case 'number':
        return <SelectIntegerField {...props} />;
      case 'string':
        return <SelectStringField {...props} />;
      case 'select':
      case 'multiple_select':
      case 'select_dynamic':
      case 'multiple_select_dynamic':
        return <SelectWrapper {...props} />;
      case 'date':
        return <DateField {...props} />;
      default:
        return <h3 key="error">Field type error</h3>;
    }
  }

  return (
    <>
      {state.fields
        .slice()
        .filter((f) => Boolean(f.visible))
        .sort(({ order: currentOrder }, { order: nextOrder }) => currentOrder - nextOrder)
        .map((item) => (
          <FieldWrapper
            key={item.id}
            children={getFieldByType(item.type, { item, updateField: state.updateField })}
            field={item}
            onMoveFields={handleMoveFields}
            onHideField={hideField}
            onDragEnd={handleDragEnd}
          />
        ))}
    </>
  )
}
