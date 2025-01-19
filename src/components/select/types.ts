export interface ISelectProps {
  multiple?: boolean;
  filterable?: boolean;
  minInputLength?: number;
  maxSelectionLength?: number;
  filterDelay?: number;
  value?: SelectPropsValue;
  valueField?: string;
  textField?: string;
  data?: IDataItem[] | IGroupDataItem[];
  dataUrl?: string;
  remoteMode?: boolean;
  closeOnSelect?: boolean;
  selectWidth?: string;
  queryParams?: IQueryParams;
  queryTitleName?: string;
  onChange?: (options: IDataItem[]) => void;
}

// export type SelectPropsValue = 
//   | (number | string) 
//   | (number | string)[]
//   | IDataItem 
//   | IDataItem[]

export type SelectPropsValue =
  string[]
  | number[]
  | IDataItem
  | IDataItem[]

export type SelectValue = IDataItem[]

export type SelectData = Array<IDataItem | IGroupDataItem>

export interface IDropdownProps {
  children?: React.ReactElement;
  multiple?: boolean;
  isShowLettersCount?: boolean;
  lettersRemaining?: number;
  isNoData?: boolean;
  canSelectMore?: boolean;
  isLoading?: boolean;
  selectedOptions?: IDataItem[];
  data?: SelectData;
  position?: DOMRect;
  onChange?: (option: IDataItem) => void;
}

export interface ISelectReducerProps {
  minInputLength: number;
  data: SelectData;
  filterable: boolean;
  value: SelectPropsValue;
}
export interface ISelectReducerState {
  value: IDataItem[];
  data: SelectData;
  filteredData: SelectData;
  loading: boolean;
  filterValue: string;
  inited: boolean;
  hasErrorsOnFetch: boolean;
}

export type ISelectReducerAction =
  | { type: "setLoading", loading: boolean }
  | { type: "setValue", value: IDataItem[] }
  | { type: "setFilterValue", filterValue: string }
  | { type: "setFilteredData", filteredData: SelectData }
  | { type: "setFetchError" }

export interface IDataItem {
  value: string | number;
  title: string | number;
}

export interface IGroupDataItem {
  title: string;
  options: IDataItem[];
}

export interface IQueryParams {
  [key: string]: any;
}

export interface DropdownPosition {
  width: string | number;
  top?: string | number;
  left: string | number;
  bottom?: string | number;
}
