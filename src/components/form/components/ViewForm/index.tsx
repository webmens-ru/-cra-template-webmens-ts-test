import React from "react";
import { FileInputItem } from "../../../file_input/types";
import { MultifieldItem } from "../../../multifield/types";
import { RichTextValue } from "../../../richtext/types";
import { IDataItem } from "../../../select/types";
import { FormFieldsItem } from "../../types";
import Field from "../field";
import { DateVF, FileVF, InputVF, MultifieldVF, RichtextVF, SelectVF } from "./entries";
import { IViewFormProps } from "./types";

export const ViewForm = ({
  form,
  fields,
}: IViewFormProps) => {

  const getEntry = (field: FormFieldsItem): JSX.Element => {
    const value = form.values[field.name]
    switch (field.type) {
      case 'input':
        return <InputVF value={value as string} />
      case 'select':
        return <SelectVF value={value as IDataItem|IDataItem[]} fieldParams={field.fieldParams} />
      case 'multifield':
        return <MultifieldVF value={value as unknown as Array<string|MultifieldItem>} fieldParams={field.fieldParams} />
      case 'file':
        return <FileVF value={value as FileInputItem[]} />
      case 'date':
        return <DateVF value={value as string} />
      case 'richtext':
        return <RichtextVF value={value as RichTextValue} />
      default:
        return <span>Error!</span>
    }
  }

  return (
    <>
      {fields.map(field => {
        return (
          <Field key={field.name} label={field.label} children={getEntry(field)} />
        )
      })}
    </>
  )
}
