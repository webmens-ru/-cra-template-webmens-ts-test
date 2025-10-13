import React from "react";
import { Checkbox } from "../../../checkbox";
import { CheckboxValue } from "../../../checkbox/types";
import { DatePicker } from "../../../date_picker";
import FileInput from "../../../file_input";
import { FileInputItem } from "../../../file_input/types";
import { FormFieldsItem, FormFieldsItemShort } from "../../../form/types";
import Input from "../../../input";
import { InputValue } from "../../../input/types";
import Multifield from "../../../multifield";
import { MultifieldItem, MultifieldItemComboValue } from "../../../multifield/types";
import { Richtext } from "../../../richtext/Richtext";
import { RichTextValue } from "../../../richtext/types";
import Select from "../../../select";
import { SelectPropsValue } from "../../../select/types";
import { validator } from "../../utils/validator";
import Field from "../field";
import { IEditFormProps } from "./types";

export const EditForm = ({
  form,
  fields,
  dispatch,
  validationRules = [],
}: IEditFormProps) => {
  const handleFieldChange = (field: FormFieldsItem, value: any) => {
    let parsedValue = value

    switch (field.type) {
      case "multifield":
        parsedValue = (value as MultifieldItem[]).map(item => typeof item.value === 'object'
          ? (item.value as MultifieldItemComboValue).text
          : item.value
        )
        break;
      case "richtext":
        parsedValue = (value as string).replace(/<\/?[^>]+(>|$)/g, "").replaceAll('&nbsp;', ' ')
        break;
    }

    const errors = validateField({ name: field.name, value: parsedValue })
    dispatch({ type: 'set_form', form: { field: { name: field.name, value }, errors } })
  }

  const validateField = ({ name, value }: FormFieldsItemShort) => {
    const errors = validator(name, value, validationRules)

    if (!errors.length) {
      return form.errors.filter(item => item.field !== name)
    } else if (form.errors.some(item => item.field === errors[0].field)) {
      return form.errors.filter(item => item.field !== name).concat(errors)
    } else {
      return form.errors.concat(errors)
    }
  }

  const buildSelectQueryParams = (fieldNames?: string[], queryParams: any = {}) => {
    if (!fieldNames) return queryParams

    const valuesEntities = Object.entries(form.tempValues)
    const parentFields = valuesEntities.filter(([key]) => fieldNames.includes(key))
    const params = { ...queryParams }

    for (let [key, value] of parentFields) {
      params[key] = value
      switch (typeof value) {
        case "string":
        case "boolean":
          params[key] = value
          break;
        case "object":
          if (!Array.isArray(value)) {
            params[key] = value.value
            break;
          }

          if (!value.length) break

          if (value.length > 1) {
            // @ts-ignore
            params[key] = value.map(item => "title" in item ? item.value : item.fileName)
          } else {
            params[key] = "title" in value[0] ? value[0].value : value[0].name
          }

          break;
        default:
          params[key] = value
      }
    }

    return params
  }

  const getEntry = (field: FormFieldsItem) => {
    const formValue = form.tempValues[field.name];

    switch (field.type) {
      case 'input':
        return (
          <Input
            {...field}
            {...field.fieldParams}
            onChange={(value) => handleFieldChange(field, value)}
            value={formValue as InputValue}
          />
        )
      case 'select':
        return (
          <Select
            {...field}
            {...field.fieldParams}
            queryParams={buildSelectQueryParams(field.parentQueryFields, field.fieldParams?.queryParams)}
            onChange={(value) => handleFieldChange(field, value)}
            value={formValue as SelectPropsValue}
          />
        )
      case 'date':
        return (
          <DatePicker
            {...field}
            {...field.fieldParams}
            initialDateISO={formValue as string}
            onSelect={(value) => handleFieldChange(field, value)}
          />
        )
      case 'checkbox':
        return (
          <Checkbox
            {...field.fieldParams}
            value={formValue as CheckboxValue}
            onCheck={(value) => handleFieldChange(field, value)}
          />
        )
      case 'file':
        return (
          <FileInput
            {...field.fieldParams}
            defaultFileList={formValue as FileInputItem[]}
            onChange={(file) => handleFieldChange(field, file)}
          />
        )
      case 'multifield':
        return (
          <Multifield
            {...field.fieldParams}
            fields={formValue as unknown as MultifieldItem[]}
            onChange={(values) => handleFieldChange(field, values)}
          />
        )
      case 'richtext':
        return (
          <Richtext
            {...field.fieldParams}
            value={formValue as RichTextValue}
            onChange={(value) => handleFieldChange(field, value)}
          />
        )
      default:
        return <h1>Type Error!</h1>
    }
  }

  return (
    <>
      {fields.map(field =>
        <Field name={field.name} key={field.name} label={field.label} labelSuffix={field.labelSuffix} errors={form.errors} >
          {getEntry(field)}
        </Field>
      )}
    </>
  )
}