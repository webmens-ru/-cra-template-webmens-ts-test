import { TRowItem, TRowID, TColumnItem } from '@webmens-ru/ui_lib/dist/components/grid/types/index';
import { createSlice } from "@reduxjs/toolkit";
import { TFilter } from "@webmens-ru/ui_lib/dist/components/filter/types";
import { Item } from "@webmens-ru/ui_lib/dist/components/menu/types";
import { IBlockItem } from '@webmens-ru/ui_lib/dist/components/toolbar';

interface IState {
  currentTab: Item;
  currentFilter: TFilter;
  filterResponse: null | string;
  toolbarFilterResponse: null | string;
  lastTimeSliderOpened: number | null;
  checkboxes: TRowID[];
  checkedRows: number[];
  isLoading: boolean;
  isError: boolean;
  grid: IGridState;
  schema: TColumnItem[]
}

interface IGridState {
  header?: {
    blocks: IBlockItem[]
  };
  grid?: TRowItem[];
  footer?: TRowItem[];
}

const initialState: IState = {
  currentTab: {} as Item,
  currentFilter: {} as TFilter,
  checkboxes: [],
  checkedRows: [],
  filterResponse: null,
  toolbarFilterResponse: null,
  lastTimeSliderOpened: null,
  isLoading: true,
  isError: false,
  grid: {},
  schema: []
};

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    setCurrentTab: (state, { payload }) => {
      state.currentTab = payload;
    },
    setCurrentFilter: (state, { payload }) => {
      state.currentFilter = payload;
    },
    setFilterResponse: (state, { payload }) => {
      state.filterResponse = payload;
      state.toolbarFilterResponse = null;
    },
    setToolbarFilterResponse: (state, { payload }) => {
      state.toolbarFilterResponse = payload;
    },
    setTimeSliderOpened: (state, { payload }) => {
      state.lastTimeSliderOpened = payload
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
    }
  },
});

export const {
  setCurrentTab,
  setCurrentFilter,
  setFilterResponse,
  setToolbarFilterResponse,
  setTimeSliderOpened,
  setIsLoading,
  setIsError,
  setCheckboxes,
  setGrid,
  setSchema
} = mainSlice.actions;
