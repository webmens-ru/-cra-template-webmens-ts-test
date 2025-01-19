import React from "react";
import { FileInputItem } from "../../../file_input/types";
import { IMultifieldProps, MultifieldItem, MultifieldItemComboValue, MultifieldItemValue } from "../../../multifield/types";
import { RichTextValue } from "../../../richtext/types";
import { IDataItem, ISelectProps } from "../../../select/types";
import { ViewFieldLink, ViewFieldList, ViewFieldText } from "./styles";

const FIELD_PLACEHOLDER = "Не задано";

export interface IViewField<T> {
  value?: T;
}

export interface ISelectViewField extends IViewField<string | IDataItem | IDataItem[]> {
  fieldParams?: ISelectProps;
}

export interface IMultifieldViewField extends IViewField<Array<string | MultifieldItem>> {
  fieldParams?: IMultifieldProps;
}

export interface IMultifieldInner extends IMultifieldViewField {
  itemValue: string | MultifieldItem | MultifieldItemValue;
}

export const InputVF = ({ value }: IViewField<string>) => {
  const text = value || FIELD_PLACEHOLDER;
  return <ViewFieldText children={text} hasValue={!!value} />
}

export const SelectVF = ({ value, fieldParams }: ISelectViewField) => {
  if (!value || (Array.isArray(value) && !value.length)) {
    return <ViewFieldText children={FIELD_PLACEHOLDER} hasValue={false} />
  }
  else if (typeof value === "string") {
    return <ViewFieldText children={value} hasValue={true} />
  }
  else if (Array.isArray(value)) {
    if (fieldParams?.multiple) {
      return (
        <ViewFieldList>
          {value.map((item, index) => (
            <li key={index} >
              <ViewFieldText children={item.title} hasValue={!!item.title} />
            </li>
          ))}
        </ViewFieldList>
      )
    } else {
      return <ViewFieldText children={value[0]?.title || FIELD_PLACEHOLDER} hasValue={!!value[0]?.title} />
    }
  } else {
    return <ViewFieldText children={value?.title || FIELD_PLACEHOLDER} hasValue={!!value?.title} />
  }
}

export const MultifieldVF = ({ value, fieldParams }: IMultifieldViewField) => {
  if (typeof value === "string") {
    return <MultifieldInnerVF itemValue={value} fieldParams={fieldParams} />
  }
  if (!value || !value.length) {
    return <ViewFieldText children={FIELD_PLACEHOLDER} hasValue={false} />
  } else {
    return (
      <ViewFieldList>
        {value.map((item, index) => (
          <li key={index}>
            <MultifieldInnerVF itemValue={item} fieldParams={fieldParams} />
          </li>
        ))}
      </ViewFieldList>
    )
  }
}

export const MultifieldInnerVF = ({ itemValue, fieldParams }: IMultifieldInner) => {
  if (!itemValue) {
    return <ViewFieldText hasValue={false} children={FIELD_PLACEHOLDER} />
  }
  else if (typeof itemValue === "string") {
    return <InputVF value={itemValue as string} />
  } else {
    const multifieldValue = (typeof itemValue !== "number" && "value" in itemValue) ? itemValue.value : itemValue
    switch (fieldParams?.type) {
      case "input":
        return <InputVF value={multifieldValue as string} />
      case "select":
        return <SelectVF value={multifieldValue as IDataItem[]} />
      case "combo":
        const comboValue = multifieldValue as MultifieldItemComboValue
        return (
          <span>
            <InputVF value={comboValue.text as string} />
            <b> | </b>
            <SelectVF value={comboValue.type as IDataItem[]} />
          </span>
        )
      default:
        return <ViewFieldText hasValue={false} children={FIELD_PLACEHOLDER} />
    }
  }
}

export const FileVF = ({ value }: IViewField<FileInputItem[] | FileInputItem>) => {
  if (!value) {
    return <ViewFieldText children={FIELD_PLACEHOLDER} hasValue={false} />
  }
  if (!Array.isArray(value)) {
    return <ViewFieldLink children={value.name} hasValue={true} href={value.url} target="_blank" />
  }
  return (
    <ViewFieldList>
      {value.map(item => (
        <li>
          <ViewFieldLink children={item.name} hasValue={true} href={item.url} target="_blank" />
        </li>
      ))}
    </ViewFieldList>
  )
}

export const DateVF = ({ value }: IViewField<string>) => {
  if (value) {
    const text = new Date(value).toLocaleDateString()
    return <ViewFieldText children={text} hasValue={true} />
  } else {
    return <ViewFieldText children={FIELD_PLACEHOLDER} hasValue={false} />
  }
}

export const RichtextVF = ({ value }: IViewField<RichTextValue>) => {
  if (!value) {
    return <ViewFieldText children={FIELD_PLACEHOLDER} hasValue={false} />
  }

  return <div dangerouslySetInnerHTML={{ __html: value }} />
}
