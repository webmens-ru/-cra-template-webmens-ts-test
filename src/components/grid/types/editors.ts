import { TColumnItem, TRowItem } from './types';

export interface EditorProps {
  column: TColumnItem;
  row: TRowItem;
  onRowChange: (row: TRowItem, commitChanges?: boolean) => void;
  onClose: (commitChanges?: boolean) => void;
  onChangeEnd: (row: TRowItem, key: string, value: any) => void;
}

export type EditorsCollection = {
  [key in EditorTypes]: (props: EditorProps) => JSX.Element;
};

export type EditorTypes = "text" | "dropdown" | "date" | "checkbox"
