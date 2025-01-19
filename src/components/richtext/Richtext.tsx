import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from "react";
import EditorStyles from "./styles";
import { RichTextProps } from "./types";

export const Richtext = ({
  onChange = () => {},
  value = ""
}: RichTextProps) => {
  const handleRichtextChange = (_event: Event, editor: typeof ClassicEditor) => {
    onChange(editor.getData())
  }

  return (
    <>
      <EditorStyles />
      <CKEditor
        editor={ClassicEditor}
        config={{ toolbar: ['bold', '|', 'bulletedList', 'numberedList',  '|', 'list'] }}
        onChange={handleRichtextChange}
        data={value}
      />
    </>
  )
}
