import React from "react";
import Select, { IDataItem } from "../../select";
import { EditorProps } from "../types/editors";

export default function DropdownEditor({ row, column, onRowChange, onClose }: EditorProps) {
  const value = [row[column.key]]

  const handleSelectChange = (options: IDataItem[]) => {
    onRowChange({ ...row, [column.key]: options[0] })
    onClose(true)
  }

  return (
    <Select
      {...column.instance.editor?.editorProps}
      value={value}
      onChange={handleSelectChange}
    />
  )
}
