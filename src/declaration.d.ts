/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

interface Window {
  "_ACCESS_TOKEN_": string;
  "_PARAMS_": any;
  "_APP_URL_": string;
  "_HOSTNAME_": string;
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.woff' {
  const src: string;
  export default src;
}

declare module '*.woff2' {
  const src: string;
  export default src;
}

declare module '*.ttf' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare const BX24: {
  openPath: (path: string, callback?: (...args: any[]) => void) => void;
  openApplication: (
    params: { bx24_width?: string | number; [index: string]: any },
    callback?: () => void,
  ) => void;
  closeApplication: () => void;
  getScrollSize: () => { scrollWidth: number, scrollHeight: number }
  resizeWindow: (width: number, height: number, cb?: any) => void;
};

declare module '@ckeditor/ckeditor5-react' {
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import Event from '@ckeditor/ckeditor5-utils/src/eventinfo'
  import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig'
  import * as React from 'react';
  const CKEditor: React.FunctionComponent<{
      disabled?: boolean;
      editor: typeof ClassicEditor;
      data?: string;
      id?: string;
      config?: EditorConfig;
      onReady?: (editor: ClassicEditor) => void;
      onChange?: (event: Event, editor: ClassicEditor) => void;
      onBlur?: (event: Event, editor: ClassicEditor) => void;
      onFocus?: (event: Event, editor: ClassicEditor) => void;
      onError?: (event: Event, editor: ClassicEditor) => void;
  }>
  export { CKEditor };
}

declare module '@ckeditor/ckeditor5-build-classic' {
  const ClassicEditorBuild: any;

  export = ClassicEditorBuild;
}
