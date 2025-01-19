import React from "react";
import Input from "../../input";
import { EditorProps } from "../types/editors";

export default function TextEditor({ row, column, onRowChange, onClose, onChangeEnd }: EditorProps) {
  const value = row[column.key]
  const key = column.instance.editor?.editorProps?.name || column.key

  const handleChangeEnd = () => {
    onClose(true)
    onChangeEnd(row, key, value)
  }

  return (
    <Input
      value={value}
      onChange={(value) => onRowChange({ ...row, [column.key]: value })}
      onBlur={handleChangeEnd}
    />
  )
}
