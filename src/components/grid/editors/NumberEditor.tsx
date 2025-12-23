import React, { useEffect, useState } from "react";
import Input from "../../input";
import { EditorProps } from "../types/editors";

export default function NumberEditor({ row, column, onRowChange, onClose, onChangeEnd }: EditorProps) {
  const initialValue = row[column.key] ?? ""
  const [value, setValue] = useState(initialValue)
  const editorProps = column.instance.editor?.editorProps
  const key = editorProps?.name || column.key

  useEffect(() => {
    setValue(row[column.key] ?? "")
  }, [column.key, row])

  const parseNumber = (nextValue: string) => {
    if (nextValue === "" || nextValue === null || nextValue === undefined) return null
    const parsed = Number(nextValue)
    return Number.isNaN(parsed) ? null : parsed
  }

  const handleChange = (nextValue: any) => {
    setValue(nextValue)
    const parsed = parseNumber(nextValue)
    onRowChange({ ...row, [column.key]: parsed })
  }

  const handleChangeEnd = () => {
    const parsed = parseNumber(value)
    onClose(true)
    onChangeEnd({ ...row, [column.key]: parsed }, key, parsed)
  }

  return (
    <Input
      value={value}
      onChange={handleChange}
      onBlur={handleChangeEnd}
      nativeInputProps={{
        type: "number",
        step: editorProps?.step,
        min: editorProps?.min,
        max: editorProps?.max
      }}
    />
  )
}

