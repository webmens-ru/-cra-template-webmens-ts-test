import { EDITORS } from "../consts"
import { EditorProps, EditorTypes } from "../types/editors"
import { TColumnItem } from "../types"

const getEditorType = (column: TColumnItem): EditorTypes => {
  const editor = column.instance.editor

  if (editor?.type) {
    return editor.type
  }

  return column.instance.type === "number" ? "number" : "text"
}

export const getSuitableEditor = (props: EditorProps) => {
  const { column } = props

  if (!column.instance.editable) {
    return EDITORS.text(props)
  }

  const editorType = getEditorType(column)

  const editor = EDITORS[editorType as keyof typeof EDITORS] || EDITORS.text

  return editor(props)
}
