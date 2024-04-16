import { createSlice } from "@reduxjs/toolkit";
import { TFilter } from "@webmens-ru/ui_lib/dist/components/filter/types";
import { BurgerItem, TRawColumnItem } from "@webmens-ru/ui_lib/dist/components/grid";
import { PaginationProps } from "@webmens-ru/ui_lib/dist/components/grid/components/pagination";
import { TRowID, TRowItem } from '@webmens-ru/ui_lib/dist/components/grid/types/index';
import { IToolbarBlock } from '@webmens-ru/ui_lib/dist/components/toolbar';

// TODO: Вынести в generic-типы
export interface IState {
  currentFilter: TFilter;
  filterResponse: null | string;
  toolbarFilterResponse: null | string;
  lastTimeSliderOpened: number | null;
  checkboxes: TRowID[];
  checkedRows: number[];
  isLoading: boolean;
  isError: boolean;
  grid: IGridState;
  entity: string;
  parentId: string;
  title: string;
  schema: TRawColumnItem[]
  pagination: PaginationProps
}

export interface IGridState {
  header?: {
    blocks: IToolbarBlock[]
  };
  grid?: TRowItem[];
  footer?: TRowItem[];
  options?: {
    key: string;
    actionColumnName: string;
    actions: BurgerItem[]
  }
}

const initialState: IState = {
  currentFilter: {} as TFilter,
  checkboxes: [],
  checkedRows: [],
  filterResponse: null,
  toolbarFilterResponse: null,
  lastTimeSliderOpened: null,
  isLoading: true,
  isError: false,
  grid: {},
  entity: '',
  parentId: '',
  title: '',
  schema: [],
  pagination: {
    currentPage: 1,
    totalCount: 100
  }
};

export const mainPlacementSlice = createSlice({
  name: "mainPlacementSlice",
  initialState,
  reducers: {
    setCurrentFilter: (state, { payload }) => {
      state.currentFilter = payload;
    },
    setFilterResponse: (state, { payload }) => {
      state.filterResponse = payload;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setIsError: (state, { payload }) => {
      state.isError = payload;
    },
    setCheckboxes: (state, { payload }) => {
      state.checkboxes = payload
    },
    setGrid: (state, {payload}) => {
      state.grid = payload
    },
    setSchema: (state, {payload}) => {
      state.schema = payload
    },
    setTimeSliderOpened: (state, { payload }) => {
      state.lastTimeSliderOpened = payload
    },
    setEntity: (state, { payload }) => {
      state.entity = payload
    },
    setParentId: (state, { payload }) => {
      state.parentId = payload
    },
    setTitle: (state, { payload }) => {
      state.title = payload
    },
  },
});

export const {
  setCurrentFilter,
  setFilterResponse,
  setIsLoading,
  setIsError,
  setCheckboxes,
  setGrid,
  setTimeSliderOpened,
  setSchema,
  setEntity,
  setParentId,
  setTitle,
} = mainPlacementSlice.actions;
