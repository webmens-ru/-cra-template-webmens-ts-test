import React from "react";
import Select, { IDataItem } from "../../select";
import { EditorProps } from "../types/editors";

export default function DropdownEditor({ row, column, onRowChange, onClose }: EditorProps) {
  const value = [row[column.key]]
  const editorProps = column.instance.editor?.editorProps

  const handleSelectChange = (options: IDataItem[]) => {
    onRowChange({ ...row, [column.key]: options[0] })
    onClose(true)
  }

  return (
    <Select
      {...editorProps}
      value={value}
      onChange={handleSelectChange}
    />
  )
}
