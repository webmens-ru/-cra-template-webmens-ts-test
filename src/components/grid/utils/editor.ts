import { EDITORS } from "../consts"
import { EditorProps } from "../types/editors"

export const getSuitableEditor = (props: EditorProps) => {
  if (!props.column.instance.editable || !props.column.instance.editor) {
    return EDITORS.text(props)
  }

  const editor = EDITORS[props.column.instance.editor.type]

  return editor(props)
}
