import { createGlobalStyle } from "styled-components"

const EditorStyles = createGlobalStyle`
  :root {
    // Toolbar
    --ck-color-text: #7D858F;
    --ck-color-base-foreground: #F8FAFA;
    --ck-color-toolbar-border: #DFE3E7;

    // Content Field
    --ck-inner-shadow: inset 2px 2px 2px var(--ck-color-shadow-inner);
    --ck-color-focus-border: #DFE3E7;
    --ck-color-base-border: #DFE3E7;
  }

  .ck > .ck.ck-editor__editable_inline.ck-blurred, .ck > .ck.ck-editor__editable_inline.ck-focused {
    border-top: none;
    transition: all 100ms linear;
  }

  .ck.ck-content {
    min-height: 150px;
    line-height: 1.25rem;

    ul {
      list-style: initial;
      padding-left: 13px;
    }

    ol {
      list-style: decimal;
      padding-left: 15px;
    }
  }
`

export default EditorStyles