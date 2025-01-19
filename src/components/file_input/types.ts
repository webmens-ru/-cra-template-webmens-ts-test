export interface IFileInputProps {
  defaultFileList?: FileInputPropsValue | FileInputPropsValue[];
  maxLimit?: number;
  extensions?: string[];
  uploadUrl?: string;
  deleteUrl?: string;
  queryParams?: FileInputQueryParams;
  deleteQueryParams?: FileInputQueryParams;
  onChange?: (file: FileInputItem[]) => void;
}

export interface FileInputPropsValue {
  name: string
  url: string
}

export interface FileInputItem extends FileInputPropsValue {
  key: string
  instance?: File
}

export interface FileInputQueryParams {
  [key: string]: any;
}
