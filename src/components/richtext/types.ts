export interface RichTextProps {
  onChange?: (text: string) => void;
  value?: RichTextValue;
}

export type RichTextValue = string;
