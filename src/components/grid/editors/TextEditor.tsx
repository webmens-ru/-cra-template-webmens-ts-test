import React, { useEffect, useState } from "react";
import Input from "../../input";
import { EditorProps } from "../types/editors";

export default function TextEditor({ row, column, onRowChange, onClose, onChangeEnd }: EditorProps) {
  const [value, setValue] = useState(row[column.key])
  const key = column.instance.editor?.editorProps?.name || column.key

  useEffect(() => {
    setValue(row[column.key])
  }, [column.key, row])

  const handleChange = (nextValue: any) => {
    setValue(nextValue)
    onRowChange({ ...row, [column.key]: nextValue })
  }

  const handleChangeEnd = () => {
    onClose(true)
    onChangeEnd({ ...row, [column.key]: value }, key, value)
  }

  return (
    <Input
      value={value}
      onChange={handleChange}
      onBlur={handleChangeEnd}
    />
  )
}
