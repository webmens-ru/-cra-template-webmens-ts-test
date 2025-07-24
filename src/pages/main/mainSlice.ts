import { createSlice } from "@reduxjs/toolkit";
import { mainApi } from './mainApi';
import type { TRawColumnItem, TRowID, TRowItem } from "../../components/grid";
import type { TFilter } from "../../components/filter/types";
import type { Item } from "../../components/menu/types";
import type { PaginationProps } from "../../components/grid/components/pagination";
import type { IToolbarBlock } from "../../components/toolbar";

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
  schema: TRawColumnItem[]
  pagination?: PaginationProps
}

export interface IGridState {
  header?: {
    blocks: IToolbarBlock[]
  };
  grid?: TRowItem[];
  footer?: TRowItem[];
  options?: any;
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
      state.filterResponse = null;
    },
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
    setPagination: (state, { payload }) => {
      state.pagination = payload
    },
    setPage: (state, { payload }) => {
      // @ts-ignore
      state.pagination.currentPage = payload
    }
  },
  extraReducers(builder) {
    builder
      .addMatcher(mainApi.endpoints.editRow.matchRejected, (state, action) => {
        console.log(action.payload)
        const data = action.payload?.data as any
        if (data && "error" in data) {
          const errorKeys = Object.keys(data.error)
          
          if (errorKeys.length) {
            alert(data.error[errorKeys[0]][0])
          }
        }
        
      })
  },
});

export const {
  setCurrentTab,
  setCurrentFilter,
  setFilterResponse,
  setIsLoading,
  setIsError,
  setCheckboxes,
  setGrid,
  setTimeSliderOpened,
  setSchema,
  setPagination,
  setPage
} = mainSlice.actions;
