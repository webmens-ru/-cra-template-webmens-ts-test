import Select, { type SelectProps, type SelectValue } from "../../../select";

export interface LinkFieldProps extends SelectProps {
  linkView?: {
    type: 'openPath' | 'openApplication',
    linkTemplate: string,
    width?: number
  }
}

export type LinkFieldValue = SelectValue

export default function LinkField({ linkView, ...selectProps }: LinkFieldProps) {
  return (
    <Select {...selectProps} readonly />
  )
}
